const express = require('express');

const app = express();

const productsRoutes = require('./shop_api/routes/products');
const ordersRoutes = require('./shop_api/routes/orders');

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

module.exports = app;
