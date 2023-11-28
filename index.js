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
    const allItemsQueryString = 'SELECT * FROM items';
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
    const { name, price } = req.body;
    const addItemQueryString = `INSERT INTO items(name, price) values('${name}', ${price});`;
    try {
        await db.query(addItemQueryString);
        res.send(`Added item named ${name} with price ${price}`)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
});

//edit item by id with name, price
app.put('/items/id', async (req, res) => {
    const { id } = req.params;
    let parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        res.status(400).send('Invalid ID supplied');
        return
    }
    const { name, price } = req.body;
    const UpdateItemQueryString = `UPDATE items set name = '${name}', price = ${price} WHERE id = ${id}`;
    try {
        let result = await db.query(`SELECT * FROM items WHERE id = ${id}`);
        if (result.rows.length === 0) {
            res.status(404).send('Item not found');
            return
        }
        await db.query(UpdateItemQueryString);
        res.send("Update done.");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//delete item by id
app.delete('/items/id', async (req, res) => {
    const { id } = req.params;
    let parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        res.status(400).send('Invalid ID supplied');
        return
    }
    try {
        await db.query(`DELETE FROM items WHERE id = ${id}`);
        res.send(`Deleted item with id ${id}.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


//CRUD functionalities for USERS
//show all users
app.get('/users', async (req, res) => {
    const allUsersQueryString = 'SELECT * FROM users'
    try {
        const result = await db.query(allUsersQueryString);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//add new user with username
app.post('/users', async (req, res) => {
    const { username } = req.body;
    const addUserQueryString = `INSERT INTO users(username) values('${username}');`;
    try {
        await db.query(addUserQueryString);
        res.send(`Added user ${username}`);
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
});

//edit user by id with username
app.put('/users/id', async (req, res) => {
    const { id } = req.params;
    let parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        res.status(400).send('Invalid ID supplied');
        return
    }
    const { username } = req.body;
    const UpdateItemQueryString = `UPDATE users set username = '${username}' WHERE id = ${id}`;
    try {
        let result = await db.query(`SELECT * FROM users WHERE id = ${id}`);
        if (result.rows.length === 0) {
            res.status(404).send('User not found');
            return
        }
        await db.query(UpdateItemQueryString);
        res.send("Update done.");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//delete user by id
app.delete('/users/id', async (req, res) => {
    const { id } = req.params;
    let parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        res.status(400).send('Invalid ID supplied');
        return
    }
    try {
        await db.query(`DELETE FROM users WHERE id = ${id}`);
        res.send(`Deleted user with id ${id}.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


//CRUD functionalities for carts
//show all carts
app.get('/carts', async (req, res) => {
    const allCartsQueryString = 'SELECT * FROM carts'
    try {
        const result = await db.query(allCartsQueryString);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//add new cart with name
app.post('/carts', async (req, res) => {
    const { name } = req.body;
    const addCartQueryString = `INSERT INTO carts(name) values('${name}');`;
    try {
        await db.query(addCartQueryString);
        res.send(`Added cart with name ${name}`);
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
});

//delete cart by userid
app.delete('/carts/id', async (req, res) => {
    const { id } = req.params;
    let parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        res.status(400).send('Invalid ID supplied');
        return
    }
    try {
        await db.query(`DELETE FROM carts WHERE user_id = ${id}`);
        res.send(`Deleted cart from user with id ${id}.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//CRUD functionalities for item_in_cart
// /!\ /!\ add item to cart with cart_id, item_id /!\ /!\
app.post('/shopping', async (req, res) => {

});

// /!\ /!\ delete item from cart by item_id with cart_id /!\ /!\
app.delete('/carts/itemid', async (req, res) => {

});

//clear all items in cart by cart_id (in item_in_cart table)
app.delete('/carts/cartid', async (req, res) => {
    const { id } = req.params;
    let parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        res.status(400).send('Invalid ID supplied');
        return
    }
    try {
        await db.query(`DELETE FROM item_in_cart WHERE cart_id = ${id}`);
        res.send(`Emptied cart with id ${id}.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log("Listening on Port 3000...");
})
