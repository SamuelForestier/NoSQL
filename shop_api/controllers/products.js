const mongoose = require('mongoose');

const Product = require('../models/product');

module.exports = {
    get_all: async (req, res, next) => {
        Product.find()
        .select('_id name price')
        .exec()
        .then(documents => {
            res.status(200).json({
                count: documents.length,
                products: documents.map(document => {
                    return {
                        _id: document._id,
                        name: document.name,
                        price: document.price,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + document._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    },

    create_product: async (req, res, next) => {
        const product = new Product({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            price : req.body.price
        });
        product.save()
        .then(result => {
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    },

    get_product: async (req, res, next) => {
        Product.findById(req.params.productId)
        .select('_id name price')
        .exec()
        .then(document => {
            if (document) {
                res.status(200).json({
                    product: document,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products'
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    },

    update_product: async (req, res, next) => {
        const updateOps = {};
        for (const [key, value] of Object.entries(req.body)) {
            updateOps[key] = value;
        }
        Product.updateOne({ _id: req.params.productId }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + req.params.productId
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    },

    delete_product: async (req, res, next) => {
        Product.findByIdAndRemove(req.params.productId)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
};