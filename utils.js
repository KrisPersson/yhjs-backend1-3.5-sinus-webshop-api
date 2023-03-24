const allProducts = require("./products.json")

function compileCart(cart) {

    const compiledCart = []

    allProducts.forEach(product => {
        if (cart.includes(product.serial)) {
            compiledCart.push(product)
        }
    })
    return compiledCart
}

function isProduct(serialInput) {

    let returnValue = false

    allProducts.forEach(product => {
        if (product.serial === serialInput) {
            returnValue = true
        }
    })
    return returnValue
}

module.exports = { compileCart, isProduct }
