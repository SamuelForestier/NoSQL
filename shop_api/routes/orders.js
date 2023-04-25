const express = require('express');
const router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');

const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get('/', OrdersController.get_all);

// Handle incoming POST requests to /orders
router.post('/', OrdersController.create_order);

// Handle incoming GET requests to /orders/:orderId
router.get('/:orderId', OrdersController.get_order);

// Handle incoming DELETE requests to /orders/:orderId
router.delete('/:orderId', OrdersController.delete_order);

module.exports = router;
