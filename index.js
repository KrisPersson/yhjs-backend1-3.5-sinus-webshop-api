const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const products = require("./products.json")
const { productsRouter } = require('./routes/products.js')
const { orderhistoryRouter } = require('./routes/orderhistory.js')
const { shoppingcartRouter } = require('./routes/shoppingcart.js')




app.use(express.json())


const swaggerUI = require('swagger-ui-express')
const apiDocs = require('./docs/docs.json')
app.use('/api/docs', swaggerUI.serve)
app.get('/api/docs', swaggerUI.setup(apiDocs))

const allProducts = [...products]

app.use('/api/products', productsRouter)
app.use('/api/orderhistory', orderhistoryRouter)
app.use('/api/shoppingcart', shoppingcartRouter)

  

app.listen(PORT, () => {
    console.log(`Started server at http://localhost:${PORT}`)
})

module.exports = { allProducts }