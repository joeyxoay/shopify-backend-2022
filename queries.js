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

module.exports = {
    getItems,
    getDeletedItems
}