const { getCart, postCart, deleteCart } = require('../model/shoppingCart')

async function getCartCtrl(request, response) {
    const compiledCart = await getCart()

    const result = {
        success: true,
        cart: compiledCart
    }
    response.json(result)
}

async function postCartCtrl(request, response) {
    const serialInput = request.body.serial
    await postCart(serialInput)

    const compiledCart = await getCart()
    const result = {
        success: true,
        cart: compiledCart
    }

    response.json(result)
}

async function deleteCartCtrl(request, response) {
    const serialInput = request.body.serial
    await deleteCart(serialInput)

    const compiledCart = await getCart()

    const result = {
        success: true,
        cart: compiledCart
    }

    response.json(result)
}

module.exports = { getCartCtrl, postCartCtrl, deleteCartCtrl }
