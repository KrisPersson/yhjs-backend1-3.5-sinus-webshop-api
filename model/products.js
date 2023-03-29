const { database, productsDbId } = require('../db.js')

async function getProducts() {
    const { products } = await database.findOne(productsDbId)
    return products
}

module.exports = { getProducts }
