const { isProduct } = require('../utils')
const { database, cartDbId } = require('../db.js')

async function checkCartBody(request, response, next) {

    const { shoppingCart } = await database.findOne( cartDbId )
    const isProductVar = await isProduct(request.body.serial)

    if (!request.body.hasOwnProperty('serial')) {
        response.status(400).json({success: false, error: 'Wrong data in body'})
        return
    } else if (!isProductVar) {
        response.status(400).json({success: false, error: 'No product match for this serial number'})
        return
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

async function checkOrderBody(request, response, next) {

    const { shoppingCart } = await database.findOne(cartDbId)

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
