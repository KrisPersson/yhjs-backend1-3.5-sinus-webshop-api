const { Router } = require('express')
const router = Router()

const products = require("../products.json")

router.get('/', (request, response) => {  // GET All products

    const result = {
        success: true,
        products: [...products]
    }
    response.json(result)
})

module.exports = { productsRouter: router } 