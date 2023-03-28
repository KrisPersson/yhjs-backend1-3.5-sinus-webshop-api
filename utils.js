const {database, productsDbId} = require('./db.js')

async function compileCart(cart) {
    const compiledCart = []
    const getProducts = await database.find(productsDbId)
    const allProducts = getProducts[0].products

    allProducts.forEach(product => {
        if (cart.includes(product.serial)) {
            compiledCart.push(product)
        }
    })
    return compiledCart
}

async function isProduct(serialInput) {

    let returnValue = false
    const getProducts = await database.find(productsDbId)
    const allProducts = getProducts[0].products

    allProducts.forEach(product => {
        if (product.serial === serialInput) {
            returnValue = true
        }
    })
    return returnValue
}

module.exports = { compileCart, isProduct }
