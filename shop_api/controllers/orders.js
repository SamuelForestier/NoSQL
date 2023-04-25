const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

module.exports = {
    get_all: async (req, res, next) => {
        Order.find()
        .select('_id product quantity')
        .populate('product', 'name')
        .exec()
        .then(documents => {
            res.status(200).json({
                count: documents.length,
                orders: documents.map(document => {
                    return {
                        _id : document._id,
                        product : document.product,
                        quantity : document.quantity,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:3000/orders/' + document._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });
    },

    create_order: async (req, res, next) => {
        Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id : new mongoose.Types.ObjectId(),
                product : req.body.productId,
                quantity : req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
    },

    get_order: async (req, res, next) => {   
        Order.findById(req.params.orderId)
        .select('_id product quantity')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    },

    delete_order: async (req, res, next) => {
        Order.findByIdAndRemove(req.params.orderId)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: { productId: 'ID', quantity: 'Number' }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
}
