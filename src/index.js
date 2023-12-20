const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

const router = require('./router');
router(app);

app.listen(3000, () => {
    console.log("Listening on Port 3000...");
})
