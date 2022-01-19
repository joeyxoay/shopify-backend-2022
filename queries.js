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

module.exports = {
    getItems,
    getDeletedItems,
    addItem
}