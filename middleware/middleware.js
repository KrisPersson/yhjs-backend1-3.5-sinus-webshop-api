const { getCurrentCart } = require('../cart')


function checkCartBody(request, response, next) {

    const shoppingCart = getCurrentCart()

    if (!request.body.hasOwnProperty('serial')) {
        response.status(400).json({success: false, error: 'Wrong data in body'})
    }

    const serial = request.body.serial

    switch (request.method) {
        case 'POST':
            if (shoppingCart.includes(serial)) {
                response.status(400).json({success: false, error: 'Product already in cart'})
                break
            } else {
                next()
                break
            }
        case 'DELETE':
            if (shoppingCart.includes(serial)) {
                next()
                break
            } else {
                response.status(400).json({success: false, error: 'Product not in cart and therefore can not be removed'})
                break
            }
    }
}

function checkOrderBody(request, response, next) {

    const shoppingCart = getCurrentCart()

    if (shoppingCart.length < 1) {
        response.status(400).json({success: false, error: 'No products in cart'})
        return
    }

    if (request.body.hasOwnProperty('isAuthorized') && request.body.isAuthorized) {
        next()
    } else if (request.body.hasOwnProperty('isAuthorized')) {
        response.status(401).json({success: false, error: 'Unauthorized'})
    } else {
        response.status(400).json({success: false, error: 'Wrong data in body'})
    }
}


module.exports = {
    checkCartBody,
    checkOrderBody
}