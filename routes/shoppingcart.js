const { Router } = require('express')
const router = Router()

const { checkCartBody } = require('../middleware/middleware.js')
const { compileCart } = require('../utils.js')
let { updateCart, getCurrentCart } = require('../cart')


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



module.exports = { shoppingcartRouter: router } 