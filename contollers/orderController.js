const { getOrderHistory, postOrder } = require('../model/order')

async function getOrderHistoryCtrl(request, response) {

    const orderHistory = await getOrderHistory()
    
    const result = {
        success: true,
        orderHistory: [...orderHistory]
    }
    response.json(result)
}

async function postOrderCtrl(request, response) {

    const order = await postOrder()
    
    const result = {
        success: true,
        order: order
    }
    response.json(result)
}

module.exports = { getOrderHistoryCtrl, postOrderCtrl }
