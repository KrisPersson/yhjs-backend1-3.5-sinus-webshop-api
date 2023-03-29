const { database, cartDbId } = require('../db.js')
const { compileCart } = require('../utils')

async function getCart() {
    const { shoppingCart } = await database.findOne(cartDbId)
    const compiledCart = await compileCart(shoppingCart)
    return compiledCart
}

async function postCart(serialInput) {
    const { shoppingCart } = await database.findOne(cartDbId)
    shoppingCart.push(serialInput)
    await database.update(cartDbId, { shoppingCart: [...shoppingCart] })
}

async function deleteCart(serialInput) {
    const { shoppingCart } = await database.findOne(cartDbId)
    const newCart = []

    shoppingCart.forEach(productSerial => {
        if (productSerial !== serialInput) {
            newCart.push(productSerial)
        }
    })

    await database.update(cartDbId, { shoppingCart: [...newCart] })
}

module.exports = { getCart, postCart, deleteCart }
