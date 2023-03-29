const { getProducts } = require('../model/products.js')

async function getProductsCtrl(request, response) {  // GET All products

    const products = await getProducts()

    const result = {
        success: true,
        products: [...products]
    }
    response.json(result)
}

module.exports = { getProductsCtrl }
