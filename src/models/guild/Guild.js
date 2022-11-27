const mongoose = require('mongoose');

const Guild = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    name: String,
    ownerID: String,
    isLarge: Boolean,
    joinedTimestamp: String,
    region: String,
    systemChannelID: String,
    icon: String,
    joinChannel: String,
    leaveChannel: String,
    join: { type: Boolean, default: false },
    leave: { type: Boolean, default: false },
    joinMsg: String,
    leaveMsg: String,
    prefix: String
});

module.exports = mongoose.model('Guild', Guild);