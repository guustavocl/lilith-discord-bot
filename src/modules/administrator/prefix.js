const Guild = require(process.mainModule.path + '/src/models/guild/Guild.js');

exports.run = (bot, msg, args, mongoose) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("Only admins can use this command, sorry :c");
        return;
    }
    if(args && args.length > 0) {
        if(args[0].length > 3) {
            msg.channel.send("Prefix must be less than 4 characters lenght");
            return;
        }
        Guild.where('guildId', msg.guild.id).updateOne({$set: {prefix: args[0]}}, (err, count) => {
            if(err) return;
            if(count.ok > 0)
                msg.channel.send(`Prefix is now: ${args[0]}`);
        })
    }
}

module.exports.config = {
    name: "prefix",
    aliases: ["prefix", "prefix"]
}