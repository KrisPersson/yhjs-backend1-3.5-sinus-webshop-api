import { allProducts, shoppingCart } from "./index.js"


export function compileCart() {
    const compiledCart = []

    allProducts.forEach(product => {
        if (shoppingCart.includes(product.serial)) {
            compiledCart.push(product)
        }
    })
    return compiledCart
}

export function checkCartBody(request, response, next) {

    if (!request.body.hasOwnProperty('serial')) {
        response.status(400).json({success: false, error: 'Wrong data in body'})
    }

    const serial = request.body.serial

    switch  (request.url) {
        case '/api/shoppingcart/add':
            if (shoppingCart.includes(serial)) {
                response.status(400).json({success: false, error: 'Product already in cart'})
                break
            } else {
                next()
                break
            }
        case '/api/shoppingcart/remove':
            if (shoppingCart.includes(serial)) {
                next()
                break
            } else {
                response.status(400).json({success: false, error: 'Product not in cart and therefore can not be removed'})
                break
            }
    }
}

export function checkOrderBody(request, response, next) {

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