const { Pool } = require('pg');
const domain = require('../domain/models.js');
const { Cart, Item, ItemInCart } = require('./models.js');

const getAllCartsQuery = 'SELECT * FROM carts';
const addCartQuery = 'INSERT INTO carts(name, user_id) VALUES($1, $2)';
const deleteCartsByUserIdQuery = 'DELETE FROM carts WHERE user_id = $1';
const getCartByIdQuery = 'SELECT * FROM carts WHERE id = $1';
const getCartContentQuery = 'SELECT * FROM item_in_cart WHERE cart_id = $1';
const deleteCartByIdQuery = 'DELETE FROM carts WHERE id = $1';
const getItemInCartQuery = 'SELECT * FROM item_in_cart WHERE cart_id = $1 AND item_id = $2';
const addItemToCartQuery = 'INSERT INTO item_in_cart(cart_id, item_id, amount) VALUES($1, $2, $3)';
const removeItemFromCartQuery = 'DELETE FROM item_in_cart WHERE cart_id = $1 AND item_id = $2';
const clearCartQuery = 'DELETE FROM item_in_cart WHERE cart_id = $1';
const getAllUsersQuery = 'SELECT * FROM users';
const addUserQuery = 'INSERT INTO users(username) VALUES($1)';
const getUserByIdQuery = 'SELECT * FROM users WHERE id = $1';
const updateUserByIdQuery = 'UPDATE users SET username = $1 WHERE id = $2';
const deleteUserByIdQuery = 'DELETE FROM users WHERE id = $1';
const getAllItemsQuery = 'SELECT * FROM items';
const addItemQuery = 'INSERT INTO items(name, price) VALUES($1, $2)';
const getItemByIdQuery = 'SELECT * FROM items WHERE id = $1';
const updateItemByIdQuery = 'UPDATE items SET name = $1, price = $2 WHERE id = $3';
const deleteItemByIdQuery = 'DELETE FROM items WHERE id = $1';

const pool = new Pool({
    user: 'postgres',
    password: 'changeme',
    host: 'localhost', // for local development (nodemon)
    // host: 'postgres', // if we run node in docker
    port: 5432, // default Postgres port
    database: 'postgres'
});

module.exports = {
    query: (text, params) => pool.query(text, params),

    // Domain layer ONLY knows Domain Models!!!
    getAllCarts: async function () {
        try{
            const dbResult = await pool.query(getAllCartsQuery);
            // map raw QueryResult to db model classes
            const dbModelCarts = dbResult.rows.map(row => new Cart(row.id, row.user_id, row.name, row.created_at))
            // map db model carts to domain model carts
            return dbModelCarts.map(dbCart => new domain.Cart(dbCart.id, dbCart.user_id, dbCart.name));
        } catch (error) {
            return error
        }
    },
    
    addCart: async function (name, user_id) {
        try {
            await pool.query(addCartQuery, name, user_id);
            return "ok"
        } catch (error) {
            return error
        }
    },

    deleteCartsByUserId: async function (user_id) {
        try {
            await pool.query(deleteCartsByUserIdQuery, user_id);
            return "ok"
        } catch (error) {
            return error
        }
    },

    getCartById: async function (cart_id) {
        try {
            const dbResult = await pool.query(getCartByIdQuery, cart_id);
            // map raw QueryResult to db model
            const dbModelCart = dbResult.rows.map(row => new Cart(row.id, row.user_id, row.name, row.created_at))
            // map db model to domain model
            const domainModelCart = dbModelCart.map(dbCart => new domain.Cart(dbCart.id, dbCart.user_id, dbCart.name));
            return domainModelCart
        } catch (error) {
            return error
        }
    },

    getItemById: async function (item_id) {
        try {
            const dbResult = await pool.query(getItemByIdQuery, item_id);
            // map raw QueryResult to db model
            const dbModelItem = dbResult.rows.map(row => new Item(row.id, row.price, row.name, row.created_at))
            // map db model to domain model
            return dbModelItem.map(dbItem => new domain.Item(dbItem.id, dbItem.name, dbItem.price))
        } catch (error) {
            return error
        }
    },

    getCartContent: async function (cart_id) {
        try {
            const dbResult = await pool.query(getCartContentQuery, cart_id);
            // map raw QueryResult to db model
            const dbModelItemInCart = dbResult.rows.map(row => new ItemInCart(row.id, row.cart_id, row.item_id, row.amount, row.created_at));
    
            // Get all items asynchronously
            const itemPromises = dbModelItemInCart.map(async (dbModelItemInCart) => {
                const domainItem = await this.getItemById(dbModelItemInCart.item_id);
                const amount = dbModelItemInCart.amount;
                return new domain.CartItem(domainItem, amount);
            });
    
            // Await all promises and get resolved items
            const domainModelCartItems = await Promise.all(itemPromises);
    
            const domainCart = await this.getCartById(cart_id);
    
            const domainModelCart = new domain.Cart(cart_id, domainCart.user_id, domainCart.name, domainModelCartItems);
            return domainModelCart;
        } catch (error) {
            return error;
        }
    },
    

    deleteCartById: async function (cart_id) {
        try {
            await pool.query(deleteCartByIdQuery, cart_id);
        } catch (error) {
            return error
        }
        return "ok"
    },
    
    getItemInCart: async function () {
        try {
            const dbResult = await pool.query(getItemInCartQuery, cart_id);
        } catch (error) {
            return error
        }
        return dbResult.rows.map (row => new domain.CartItem(row.id, row.cart))
    }
};
