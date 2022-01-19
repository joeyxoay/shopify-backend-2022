const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopify',
  password: 'Shopify123!',
  port: 5432,
})

const getItems = (request, response) => {
    pool.query('SELECT * FROM public.item WHERE deleted = false ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getDeletedItems = (request, response) => {
    pool.query('SELECT * FROM public.item WHERE deleted = true ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const addItem = (request, response) => {
    const { title, price, description, quantity } = request.body
    // const { title, price, description, quantity } = 
    //     {
    //         title: "test6", 
    //         price: 1.6, 
    //         description: null, 
    //         quantity:3
    //     }
  
    pool.query('INSERT INTO public.item (title, price, description, quantity) VALUES ($1, $2, $3, $4)', [title, price, description, quantity], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`${title} added successfully`)
    })
}

const editItem = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, price, description, quantity } = request.body
    // const { title, price, description, quantity } = 
    //     {
    //         title: "edit3", 
    //         price: 3.3, 
    //         description: "edit desc 3", 
    //         quantity:13
    //     }
  
    pool.query('UPDATE public.item SET title = $1, price = $2 , description = $3, quantity = $4 WHERE id = $5', [title, price, description, quantity, id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`${title} edited successfully`)
      }
    )
}

const deleteItem = (request, response) => {
    const id = parseInt(request.params.id)
    // const { comment } = request.body
    const { comment } = 
        {
            comment: "hard coded comment", 
        }

  
    pool.query('UPDATE public.item SET deleted = true, deletion_comment = $1 WHERE id = $2', [comment, id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Item with ID ${id} deleted successfully`)
    })
}

const restoreItem = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('UPDATE public.item SET deleted = false WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Item with ID ${id} restored successfully`)
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