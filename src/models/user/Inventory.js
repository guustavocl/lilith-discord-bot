const mongoose = require('mongoose');

const Inventory = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    credits: Number
});

module.exports = mongoose.model('Inventory', Inventory);