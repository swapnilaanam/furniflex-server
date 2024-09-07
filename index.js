const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const connectDB = require('./db/connectDB');

// routes
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');
const cartsRoute = require('./routes/carts');


// middleware
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send("FurniFlex server is up and running...");
});

app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/carts', cartsRoute);

app.listen(port, () => {
    console.log(`FurniFlex server is running on ${port}`);
});