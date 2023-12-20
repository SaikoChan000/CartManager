const users = require('./handler/users/users.js');
const items = require('./handler/items/items.js');
const carts = require('./handler/carts/carts.js');

module.exports = function(app) {
    // Item routes
    app.post('/items', async (req, res) => {
        const { name, price } = req.body;
        const result = await items.addItem(name, price);
        res.status(result.status).send(result.message);
    });

    app.get('/items', async (req, res) => {
        const result = await items.getAllItems();
        res.status(result.status).send(result.data || result.message);
    });

    app.get('/items/:id', async (req, res) => {
        const { id } = req.params;
        const result = await items.getItemById(id);
        res.status(result.status).send(result.data || result.message);
    });

    app.put('/items/:id', async (req, res) => {
        const { id } = req.params;
        const { name, price } = req.body;
        const result = await items.updateItemById(id, name, price);
        res.status(result.status).send(result.message);
    });

    app.delete('/items/:id', async (req, res) => {
        const { id } = req.params;
        const result = await items.deleteItemById(id);
        res.status(result.status).send(result.message);
    });

    // User routes
    app.get('/users', async (req, res) => {
        const result = await users.getAllUsers();
        res.status(result.status).send(result.data || result.message);
    });

    app.post('/users', async (req, res) => {
        const { username } = req.body;
        const result = await users.addUser(username);
        res.status(result.status).send(result.message);
    });

    app.get('/users/:id', async (req, res) => {
        const { id } = req.params;
        const result = await users.getUserById(id);
        res.status(result.status).send(result.data || result.message);
    });


    app.put('/users/:id', async (req, res) => {
        const { id } = req.params;
        const { username } = req.body;
        const result = await users.updateUserById(id, username);
        res.status(result.status).send(result.message);
    });

    app.delete('/users/:id', async (req, res) => {
        const { id } = req.params;
        const result = await users.deleteUserById(id);
        res.status(result.status).send(result.message);
    });

    // Carts routes
    app.get('/carts', async (req, res) => {
        const result = await carts.getAllCarts();
        res.status(result.status).send(result.data || result.message);
    });

    app.post('/carts', async (req, res) => {
        const { name, userid } = req.body;
        const result = await carts.addCart(name, userid);
        res.status(result.status).send(result.message);
    });

    app.delete('/carts/user/:userid', async (req, res) => {
        const { userid } = req.params;
        const result = await carts.deleteCartsByUserId(userid);
        res.status(result.status).send(result.message);
    });

    app.get('/carts/:cartid', async (req, res) => {
        const { cartid } = req.params;
        const result = await carts.getCartById(cartid);
        res.status(result.status).send(result.data || result.message);
    });

    app.delete('/carts/:cartid', async (req, res) => {
        const { cartid } = req.params;
        const result = await carts.deleteCartById(cartid);
        res.status(result.status).send(result.message);
    });

    app.post('/carts/:cartid', async (req, res) => {
        const { cartid } = req.params;
        const { action, itemid, amount } = req.body;

        let result;
        switch (action) {
            case "add":
                result = await carts.addItemToCart(cartid, itemid, amount);
                break;
            case "remove":
                result = await carts.removeItemFromCart(cartid, itemid, amount);
                break;
            case "clear":
                result = await carts.clearCart(cartid);
                break;
            default:
                res.status(400).send('Invalid action supplied');
                return;
        }
        res.status(result.status).send(result.message);
    });
}