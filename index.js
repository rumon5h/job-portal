const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.write(`<h1>Hello world!</h1>`);
    res.end();
});

module.exports = app;