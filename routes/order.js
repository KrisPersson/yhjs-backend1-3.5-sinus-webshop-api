const { Router } = require('express')
const router = Router()

const { checkOrderBody } = require('../middleware/middleware.js')
const { compileCart } = require('../utils')
const { getCurrentCart, updateCart } = require('../cart')

let orderHistory = []

function getOrderHistory() {
    return orderHistory
}
function updateOrderHistory(newHistory) {
    orderHistory = [...newHistory]
}

router.get('/history', (request, response) => { // GET Order History

    const result = {
        success: true,
        orderHistory: [...orderHistory]
    }
    response.json(result)
})

router.post('/', checkOrderBody, (request, response) => { // POST a new order

    const orderHistory = getOrderHistory()

    const order = {
        date: new Date(),
        orderNr: orderHistory.length + 1,
        items: compileCart(getCurrentCart())
    }

    const result = {
        success: true,
        order: order
    }

    updateOrderHistory([...orderHistory, order])
    updateCart([])
    
    response.json(result)
})

module.exports = { orderRouter: router, getOrderHistory, updateOrderHistory } 