
const nedb = require('nedb-promises')
const database = new nedb( { filename: 'database.db', autoload: true } )

const cartDbId = { _id: "hDmub98yBVx7d5oQ" }
const productsDbId = { _id: '6qhvyEqoqMDoUBSN' }
const orderHistoryDbId = { _id: 'FkfIz8isKnjUOIoD' }


module.exports = { database, cartDbId, productsDbId, orderHistoryDbId }
