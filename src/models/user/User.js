const mongoose = require('mongoose');
const Inventory = require(process.mainModule.path + '/src/models/user/Inventory.js');

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    username: String,
    discriminator: String,
    avatar: String,
    bot: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isMod: { type: Boolean, default: false },
    credits: Number,
    level: Number,
    levelExp: Number,
    totalExp: Number,
    lastMessage: String,
    lastDaily: String,
    createdAt: String,
    backgroundImg: String
});

module.exports = mongoose.model('User', User);