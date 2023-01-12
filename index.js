const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const colors = require('colors');


// Middleware
app.use(express.json());
app.use(cors());

// Connecting to the database
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Database connected successfully!'.green.bold)
});

app.get('/', (req, res) => {
    res.write(`<h1>Hello world!</h1>`);
    res.end();
});


const jobsRoute = require('./routes/jobs.routes');
const managerRoute = require('./routes/manager.route');

app.use('/api/v1/jobs', jobsRoute);
app.use('/api/v1/jobs', managerRoute);

app.listen(PORT, () => {
    console.log('Server listening on port'.yellow.bold, PORT);
});

module.exports = app;