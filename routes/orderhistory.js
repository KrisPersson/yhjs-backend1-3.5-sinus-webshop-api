const { Router } = require('express')
const router = Router()

let orderHistory = []

function getOrderHistory() {
    return orderHistory
}
function updateOrderHistory(newHistory) {
    orderHistory = [...newHistory]
}

router.get('/', (request, response) => { // GET Order History

    const result = {
        success: true,
        orderHistory: [...orderHistory]
    }
    response.json(result)
})

module.exports = { orderhistoryRouter: router, getOrderHistory, updateOrderHistory } 