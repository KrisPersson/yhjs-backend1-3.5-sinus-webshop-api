const { Router } = require('express')
const router = Router()
const { checkOrderBody } = require('../middleware/middleware.js')
const { getOrderHistoryCtrl, postOrderCtrl } = require('../contollers/orderController')

router.get('/history', getOrderHistoryCtrl)

router.post('/', checkOrderBody, postOrderCtrl)

module.exports = { orderRouter: router } 
