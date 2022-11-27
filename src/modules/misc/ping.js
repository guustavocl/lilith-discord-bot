const Discord = require('discord.js');

exports.run = (bot, msg, args, mongoose) => {
    console.log('teste')
    msg.channel.send("Pong!");
}

module.exports.config = {
    name: "ping",
    aliases: ["pong", "ping", "pingo"]
}