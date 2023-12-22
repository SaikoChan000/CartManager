const { Pool } = require('pg');
const domain = require('../domain/models.js');

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
        const dbResult = await pool.query(getAllCartsQuery);
        return dbResult.rows.map(row => new domain.Cart(row.id, row.user_id, row.name));
    },
    
};
