const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app= require('./index');
const PORT = process.env.PORT || 5000;
const colors = require('colors');

mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Database connected successfully!'.green.bold)
});

app.listen(PORT, () => {
    console.log('Server listening on port'.yellow.bold, PORT);
});