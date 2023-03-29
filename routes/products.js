const { Router } = require('express')
const router = Router()
const { getProductsCtrl } = require('../contollers/productsController')

router.get('/', getProductsCtrl)

module.exports = { productsRouter: router }
