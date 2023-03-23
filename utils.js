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

module.exports = { compileCart }