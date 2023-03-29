const { database, orderHistoryDbId, cartDbId } = require('../db.js')
const { compileCart } = require('../utils')

async function getOrderHistory() {
    const { orderHistory } = await database.findOne(orderHistoryDbId)
    return orderHistory
}

async function postOrder() {
    const { shoppingCart } = await database.findOne(cartDbId)
    const compiledCart = await compileCart(shoppingCart)
    const orderHistory = await getOrderHistory()

    const order = {
        date: new Date(),
        orderNr: orderHistory.length + 1,
        items: compiledCart
    }

    orderHistory.push(order)

    await database.update(orderHistoryDbId, { orderHistory: [...orderHistory] })
    await database.update(cartDbId, { shoppingCart: [] })

    return order
}

module.exports = { getOrderHistory, postOrder }
