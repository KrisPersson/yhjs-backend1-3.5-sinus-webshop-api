
let shoppingCart = ["238498293848233", "127127838128877"]

function updateCart(newCart) {
    shoppingCart = [...newCart]
}

function getCurrentCart() {
    return shoppingCart
}

module.exports = { shoppingCart, updateCart, getCurrentCart }
