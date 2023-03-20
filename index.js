import express from 'express'
import products from "./products.json" assert { type: "json" }
import { checkCartBody, checkOrderBody, compileCart } from './utils.js'

const app = express()
const PORT = 8000

app.use(express.json())

let shoppingCart = ["238498293848233", "127127838128877"]
const allProducts = [...products]
let orderHistory = []



app.get('/api/products', (request, response) => {  // GET All products

    const result = {
        success: true,
        products: [...allProducts]
    }
    response.json(result)
})

app.get('/api/shoppingcart', (request, response) => { // GET Shopping Cart

    const result = {
        success: true,
        cart: compileCart()
    }
    response.json(result)
})

app.get('/api/orderhistory', (request, response) => { // GET Order History

    const result = {
        success: true,
        orderHistory: [...orderHistory]
    }

    response.json(result)
})

app.post('/api/shoppingcart/add', checkCartBody, (request, response) => { // POST Add item to cart
    const serial = request.body.serial
    shoppingCart.push(serial)

    const result = {
        success: true,
        cart: compileCart()
    }

    response.json(result)
})

app.delete('/api/shoppingcart/remove', checkCartBody, (request, response) => { // DELETE Remove item from cart
    const serial = request.body.serial
    const newCart = []

    shoppingCart.forEach(productSerial => {
        if (productSerial !== serial) {
            newCart.push(productSerial)
        }
    })

    shoppingCart = [...newCart]

    const result = {
        success: true,
        cart: compileCart()
    }

    response.json(result)
})

app.post('/api/shoppingcart/placeorder', checkOrderBody, (request, response) => { // POST Place an order

    const order = {
        orderNr: orderHistory.length + 1,
        items: compileCart(),
        date: new Date()
    }

    const result = {
        success: true,
        order: order
    }

    orderHistory.push(order)
    shoppingCart = []
    response.json(result)
}) 

app.listen(PORT, () => {
    console.log(`Started server at http://localhost:${PORT}`)
})

export { allProducts, shoppingCart }