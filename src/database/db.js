const { Pool } = require('pg');

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

    getAllCartsQuery: 'SELECT * FROM carts',
    addCartQuery: 'INSERT INTO carts(name, user_id) VALUES($1, $2)',
    deleteCartsByUserIdQuery: 'DELETE FROM carts WHERE user_id = $1',
    getCartByIdQuery: 'SELECT * FROM carts WHERE id = $1',
    getCartContentQuery: 'SELECT * FROM item_in_cart WHERE cart_id = $1',
    deleteCartByIdQuery: 'DELETE FROM carts WHERE id = $1',
    getItemInCartQuery: 'SELECT * FROM item_in_cart WHERE cart_id = $1 AND item_id = $2',
    addItemToCartQuery: 'INSERT INTO item_in_cart(cart_id, item_id, amount) VALUES($1, $2, $3)',
    removeItemFromCartQuery: 'DELETE FROM item_in_cart WHERE cart_id = $1 AND item_id = $2',
    clearCartQuery: 'DELETE FROM item_in_cart WHERE cart_id = $1',
    getAllUsersQuery: 'SELECT * FROM users',
    addUserQuery: 'INSERT INTO users(username) VALUES($1)',
    getUserByIdQuery: 'SELECT * FROM users WHERE id = $1',
    updateUserByIdQuery: 'UPDATE users SET username = $1 WHERE id = $2',
    deleteUserByIdQuery: 'DELETE FROM users WHERE id = $1',
    getAllItemsQuery: 'SELECT * FROM items',
    addItemQuery: 'INSERT INTO items(name, price) VALUES($1, $2)',
    getItemByIdQuery: 'SELECT * FROM items WHERE id = $1',
    updateItemByIdQuery: 'UPDATE items SET name = $1, price = $2 WHERE id = $3',
    deleteItemByIdQuery: 'DELETE FROM items WHERE id = $1'
};
