const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products');

// Handle incoming GET requests to /products
router.get('/', ProductsController.get_all);

// Handle incoming POST requests to /products
router.post('/', ProductsController.create_product);

// Handle incoming GET requests to /products/:productId
router.get('/:productId', ProductsController.get_product);

// Handle incoming PUT requests to /products/:productId
router.put('/:productId', ProductsController.update_product);

// Handle incoming DELETE requests to /products/:productId
router.delete('/:productId', ProductsController.delete_product);

module.exports = router;
