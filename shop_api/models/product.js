const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    // name : { type: String, required: true },
    name: String,
    // price : { type: Number, required: true }
    price: Number,
});

module.exports = mongoose.model('Product', productSchema);