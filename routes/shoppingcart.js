const { Router } = require('express')
const router = Router()
const { database, cartDbId } = require('../db.js')
const { checkCartBody } = require('../middleware/middleware.js')
const { compileCart } = require('../utils.js')


router.get('/', async (request, response) => { // GET Shopping cart

    const { shoppingCart } = await database.findOne(cartDbId)
    const compiledCart = await compileCart(shoppingCart)

    const result = {
        success: true,
        cart: compiledCart
    }
    response.json(result)
})

router.post('/', checkCartBody, async (request, response) => { // POST item to cart
    const serialInput = request.body.serial
    const { shoppingCart } = await database.findOne(cartDbId)

    shoppingCart.push(serialInput)
    database.update(cartDbId, { shoppingCart: [...shoppingCart] })

    const compiledCart = await compileCart(shoppingCart)
    const result = {
        success: true,
        cart: compiledCart
    }

    response.json(result)
})

router.delete('/', checkCartBody, async (request, response) => { // DELETE item from cart
    const serialInput = request.body.serial
    const { shoppingCart } = await database.findOne(cartDbId)
    const newCart = []

    shoppingCart.forEach(productSerial => {
        if (productSerial !== serialInput) {
            newCart.push(productSerial)
        }
    })

    database.update(cartDbId, { shoppingCart: [...newCart] })
    const compiledCart = await compileCart(newCart)

    const result = {
        success: true,
        cart: compiledCart
    }

    response.json(result)
})

module.exports = { shoppingcartRouter: router } 
