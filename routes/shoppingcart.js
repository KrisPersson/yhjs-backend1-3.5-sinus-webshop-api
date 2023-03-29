const { Router } = require('express')
const router = Router()
const { checkCartBody } = require('../middleware/middleware.js')
const { getCartCtrl, postCartCtrl, deleteCartCtrl } = require('../contollers/shoppingCartController')

router.get('/', getCartCtrl)

router.post('/', checkCartBody, postCartCtrl)

router.delete('/', checkCartBody, deleteCartCtrl)

module.exports = { shoppingcartRouter: router } 
