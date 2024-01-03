const db = require('../database/db.js')

module.exports = {
    getAllCarts: async function() {
        const carts = await db.getAllCarts();
        return carts;
    },

    addCart: async function(name, user_id) {
        const addCartResult = await db.addCart(name, user_id);
        return addCartResult;
    },

    deleteCartsByUserId: async function (user_id) {
        const deleteCartsResult = await db.deleteCartsByUserId(user_id);
        return deleteCartsResult;
    },

    getCartById: async function (cart_id) {
        const cart = await db.getCartById(cart_id);
        return cart;
    },
    
    getCartContent: async function (cart_id) {
        let cart = await this.getCartById(cart_id);
        const cartContent = await db.getCartContent(cart_id)
        cart.cartItems = cartContent; 
        return cart;
    },

    deleteCartById: async function (cart_id) {
        const deleteCartResult = await db.deleteCartById(cart_id);
        return deleteCartResult;
    },

    getAmountofItemInCart: async function (cart_id, item_id) {
        const amountOfItemInCart = await db.getAmountofItemInCart(cart_id, item_id);
        return amountOfItemInCart;
    },

    addItemToCart: async function (cart_id, item_id, amount) { 
        // also hier will ich pruefen ob es das cart gibt
        let cartResult = await this.getCartById(cartId);
        // jetzt brauchen wir noch error handling hier
        if (cartResult instanceof Error) {
            // hier ist der richtige Ort um den error zu behandeln weil es ja tatseachlich ein error ist der nicht technisch ist
            // sondern ein business error (welcher hier behandelt werden MUSS)
            return new Error('cart does not exist');
        }
        // hier ob es das item gibt
        let itemResult = await this.getItemById(itemId);
        if (itemResult instanceof Error) {
            // genau das gleiche hier noch einmal
            return new Error('item does not exist');
        }

        // wenn wir hier trotz error handling sind, dann koennen wir das item zum cart hinzufuegen (beides gibt es)
        const addItemToCartResult = await db.addItemToCart(cart_id, item_id, amount);
        if (addItemToCartResult !== "ok") {
            return new Error('could not add item to cart');
        }
        return addItemToCartResult;
    },

    removeItemFromCart: async function (cart_id, item_id) {
        const removeItemFromCartResult = await db.removeItemFromCart(cart_id, item_id);
        return removeItemFromCartResult;
    },

    clearCart: async function (cart_id) {
        const clearCartResult = await db.clearCart(cart_id);
        return clearCartResult;
    },

    getAllUsers: async function () {
        const allUsers = await db.getAllUsers();
        return allUsers;
    },

    addUser: async function (username) {
        const addUserResult = await db.addUser(username);
        return addUserResult;
    },

    getUserById: async function (user_id) {
        const user = await db.getUserById(user_id);
        return user;
    },

    updateUserById: async function (username, user_id) {
        const updateUserResult = await db.updateUserById(username, user_id);
        return updateUserResult;
    },

    deleteUserById: async function (user_id) {
        const deleteUserResult = await db.deleteUserById(user_id);
        return deleteUserResult;
    },

    getAllItems: async function () {
        const allItems = await db.getAllItems();
        return allItems;
    },
    
    addItem: async function (name, price) {
        const addItemResult = await db.addItem(name, price);
        return addItemResult;
    },
    
    getItemById: async function (item_id) {
        const item = await db.getItemById(item_id);
        return item;
    },

    updateItemById: async function (name, price, item_id) {
        const updateItemResult = await db.updateItemById(name, price, item_id);
        return updateItemResult;
    },
    
    deleteItemById: async function (item_id) {
        const deleteItemResult = await db.deleteItemById(item_id);
        return deleteItemResult;
    },
}