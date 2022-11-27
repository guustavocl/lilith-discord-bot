const Guild = require(process.mainModule.path + '/src/models/guild/Guild.js');

exports.run = (bot, msg, args, mongoose) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("Only admins can use this command, sorry :c");
        return;
    }
    if(args && args.length > 0) {
        Guild.where('guildId', msg.guild.id).updateOne({$set: {joinChannel: args[0].replace(/\D/g,'')}}, (err, count) => {
            if(err) return;
            if(count.ok > 0)
                msg.channel.send(`Join channel is now: ${args[0]}`);
        })
    }
}

module.exports.config = {
    name: "joinchannel",
    aliases: ["joinchannel", "joinch"]
}