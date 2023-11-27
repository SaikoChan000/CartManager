const express = require('express');
const app = express();
const db = require('./db')
const path = require('path');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

//CRUD functionalities for ITEMS
//show all items
app.get('/items', async (req, res) => {
    const allItemsQueryString = 'SELECT * FROM items'
    try {
        const result = await db.query(allItemsQueryString);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//add new item with name, price
app.post('/items', async (req, res) => {

});

//edit item by id with name, price
app.put('/items/id', async (req, res) => {

});

//delete item by id
app.delete('/items/id', async (req, res) => {

});


//CRUD functionalities for USERS
//show all users
app.get('/users', async (req, res) => {

});

//add new user with username
app.post('/users', async (req, res) => {

});

//edit user by id with username
app.put('/users/id', async (req, res) => {

});

//delete user by id
app.delete('/users/id', async (req, res) => {

});


//CRUD functionalities for carts
//show all carts
app.get('/carts', async (req, res) => {

});

//add new cart with name
app.post('/carts', async (req, res) => {

});

//delete cart by id
app.delete('/carts/id', async (req, res) => {

});

//CRUD functionalities for item_in_cart
//add item to cart with cart_id, item_id
app.post('/shopping', async (req, res) => {

});

//delete item from cart by item_id with cart_id
app.delete('/carts/itemid', async (req, res) => {

});

//clear all items in cart by cart_id
app.delete('/carts/cartid', async (req, res) => {

});

app.listen(3000, () => {
    console.log("Listening on Port 3000...");
})
