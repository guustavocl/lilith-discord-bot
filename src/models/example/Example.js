const mongoose = require('mongoose');

const Example = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userId: String,
    time: String
});

module.exports = mongoose.model('Example', Example);