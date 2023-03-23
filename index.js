const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

const { productsRouter } = require('./routes/products.js')
const { orderRouter } = require('./routes/order.js')
const { shoppingcartRouter } = require('./routes/shoppingcart.js')

app.use(express.json())

const swaggerUI = require('swagger-ui-express')
const apiDocs = require('./docs/docs.json')
app.use('/api/docs', swaggerUI.serve)
app.get('/api/docs', swaggerUI.setup(apiDocs))

//---ROUTES---//

app.use('/api/products', productsRouter)
app.use('/api/order/', orderRouter)
app.use('/api/shoppingcart', shoppingcartRouter)


app.listen(PORT, () => {
    console.log(`Started server at http://localhost:${PORT}`)
})
