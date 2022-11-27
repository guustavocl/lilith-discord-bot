const Guild = require(process.mainModule.path + '/src/models/guild/Guild.js');

exports.run = (bot, msg, args, mongoose) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("Only admins can use this command, sorry :c");
        return;
    }
    if(args[0] === 'on') {
        Guild.where('guildId', msg.guild.id).updateOne({$set: {leave: true}}, (err, count) => {
            if(err) return;
            if(count.ok > 0)
                msg.channel.send("Leave message is on!");
        })
    }
    if(args[0] === 'off') {
        Guild.where('guildId', msg.guild.id).updateOne({$set: {leave: false}}, (err, count) => {
            if(err) return;
            if(count.ok > 0)
                msg.channel.send("Leave message is off!");
        })
    }
}

module.exports.config = {
    name: "leave",
    aliases: ["leave"]
}