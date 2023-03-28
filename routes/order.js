const { Router } = require('express')
const router = Router()
const { database, orderHistoryDbId, cartDbId } = require('../db.js')
const { checkOrderBody } = require('../middleware/middleware.js')
const { compileCart } = require('../utils')


router.get('/history', async (request, response) => { // GET Order History

    const { orderHistory } = await database.findOne(orderHistoryDbId)

    const result = {
        success: true,
        orderHistory: [...orderHistory]
    }
    response.json(result)
})

router.post('/', checkOrderBody, async (request, response) => { // POST a new order

    const { orderHistory } = await database.findOne(orderHistoryDbId)
    const { shoppingCart } = await database.findOne(cartDbId)
    const compiledCart = await compileCart(shoppingCart)

    const order = {
        date: new Date(),
        orderNr: orderHistory.length + 1,
        items: compiledCart
    }

    const result = {
        success: true,
        order: order
    }

    orderHistory.push(order)
    database.update(orderHistoryDbId, { orderHistory: [...orderHistory] })
    database.update(cartDbId, { shoppingCart: [] })
    
    response.json(result)
})

module.exports = { orderRouter: router } 
