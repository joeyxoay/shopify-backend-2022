const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopify',
  password: 'Shopify123!',
  port: 5432,
})

const getItems = async (request, response) => {
    pool.query('SELECT id, title, description, price, quantity \
                FROM public.item \
                WHERE deleted = false \
                ORDER BY title ASC', (error, results) => {
        if (error) {
            throw error
        }
        if(results.rowCount < 1){
            response.status(404).send("No items found");
            return;
        }
        response.status(200).json(results.rows);
        return;
    })
}

const getDeletedItems = async (request, response) => {
    pool.query('SELECT id, title, description, price, quantity, deletion_comment \
                FROM public.item \
                WHERE deleted = true \
                ORDER BY title ASC', (error, results) => {
        if (error) {
            throw error
        }
        if(results.rowCount < 1){
            response.status(404).send("No deleted items found");
            return;
        }
        response.status(200).json(results.rows);
        return;
    })
}

const addItem = async (request, response) => {
    const { title, price, description, quantity } = request.body
    if (!validateItemInputs(request.body)){
        response.status(403).send(`Invalid inputs`);
        return;
    }

    pool.query('INSERT INTO public.item (title, price, description, quantity) \
                VALUES ($1, $2, $3, $4)', [title, price, description, quantity], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`${title} added successfully`);
        return;
    })
}

const editItem = async (request, response) => {
    let id = -1;
    try {
        id = parseInt(request.params.id);
    } catch (error) {
        response.status(403).send(`Invalid ID`);
        return;
    }
    const { title, price, description, quantity } = request.body
    if (!validateItemInputs(request.body)){
        response.status(403).send(`Invalid inputs`);
        return;
    }

    pool.query('SELECT id, deleted \
                FROM public.item \
                WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        if(results.rowCount < 1){
            response.status(404).send("No item found");
            return;
        }
        if(results.rows[0].deleted){
            response.status(403).send("Can't edit deleted item");
            return;
        }

        pool.query('UPDATE public.item SET title = $1, price = $2 , description = $3, quantity = $4 \
                WHERE id = $5', [title, price, description, quantity, id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`${title} edited successfully`);
            return;
        })
    })
}

const deleteItem = async (request, response) => {
    let id = -1;
    try {
        id = parseInt(request.params.id);
    } catch (error) {
        response.status(403).send(`Invalid ID`);
        return;
    }
    const { comment } = request.body
    if(comment == null || comment.trim() == "" || typeof comment != "string"){
        response.status(403).send(`Invalid inputs`);
        return;
    }

    pool.query('SELECT id, deleted \
                FROM public.item \
                WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        if(results.rowCount < 1){
            response.status(404).send("No item found");
            return;
        }
        if(results.rows[0].deleted){
            response.status(403).send("Can't delete a deleted item");
            return;
        }

        pool.query('UPDATE public.item SET deleted = true, deletion_comment = $1 \
                    WHERE id = $2', [comment, id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Item with ID ${id} deleted successfully`);
            return;
        })
    })
}

const restoreItem = async (request, response) => {
    let id = -1;
    try {
        id = parseInt(request.params.id);
    } catch (error) {
        response.status(403).send(`Invalid ID`);
        return;
    }
    pool.query('SELECT id, deleted \
                FROM public.item \
                WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        if(results.rowCount < 1){
            response.status(404).send("No item found");
            return;
        }
        if(!results.rows[0].deleted){
            response.status(403).send("Can't restore an item that has not been deleted");
            return;
        }

        pool.query('UPDATE public.item SET deleted = false, deletion_comment = $1 \
                    WHERE id = $2', ["restored", id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Item with ID ${id} restored successfully`);
            return;
        })
    })
}

module.exports = {
    getItems,
    getDeletedItems,
    addItem,
    editItem,
    deleteItem,
    restoreItem
}

function validateItemInputs (arg){
    // required inputs
    if(arg.title == null || arg.price == null || arg.quantity == null || arg.title.trim() == "")
        return false
    // type check
    if(typeof arg.title != "string" || typeof arg.description != "string" || typeof arg.price != "number" || typeof arg.quantity != "number")
        return false

    return true;
}