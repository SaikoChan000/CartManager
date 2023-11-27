const express = require('express');
const app = express();
const db = require('./db')
const path = require('path');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.get('/pets', async (req, res) => {

});

app.listen(3000, () => {
    console.log("Listening on Port 3000...");
})
