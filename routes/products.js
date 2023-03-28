const { Router } = require('express')
const router = Router()

// const products = require("../products.json")
const { database, productsDbId } = require('../db.js')

router.get('/', async (request, response) => {  // GET All products

    const products = await database.find(productsDbId)

    const result = {
        success: true,
        products: [...products[0].products]
    }
    response.json(result)
})

module.exports = { productsRouter: router }
