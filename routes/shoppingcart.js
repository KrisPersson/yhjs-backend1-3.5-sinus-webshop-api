const { Router } = require('express')
const router = Router()

const { checkCartBody, checkOrderBody } = require('../middleware/middleware.js')
const { compileCart } = require('../utils.js')
const { getOrderHistory, updateOrderHistory } = require('./orderhistory')
let { shoppingCart, updateCart, getCurrentCart } = require('../cart')


router.get('/', (request, response) => { // GET Shopping cart

    const result = {
        success: true,
        cart: compileCart(getCurrentCart())
    }
    response.json(result)
})

router.post('/', checkCartBody, (request, response) => { // POST item to cart
    const serial = request.body.serial
    const oldCart = getCurrentCart()
    updateCart([...oldCart, serial])

    const result = {
        success: true,
        cart: compileCart(getCurrentCart())
    }

    response.json(result)
})

router.delete('/', checkCartBody, (request, response) => { // DELETE item from cart
    const shoppingCart = getCurrentCart()
    const serial = request.body.serial
    const newCart = []

    shoppingCart.forEach(productSerial => {
        if (productSerial !== serial) {
            newCart.push(productSerial)
        }
    })

    updateCart(newCart)

    const result = {
        success: true,
        cart: compileCart(getCurrentCart())
    }

    response.json(result)
})

router.post('/placeorder', checkOrderBody, (request, response) => { // POST a new order

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

module.exports = { shoppingcartRouter: router } 