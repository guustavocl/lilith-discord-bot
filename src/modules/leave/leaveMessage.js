const Guild = require(process.mainModule.path + '/src/models/guild/Guild.js');

exports.run = (bot, msg, args, mongoose) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("Only admins can use this command, sorry :c");
        return;
    }
    if(args && args.length > 0) {
        Guild.where('guildId', msg.guild.id).updateOne({$set: {leaveMsg: args.join(" ")}}, (err, count) => {
            if(err) return;
            if(count.ok > 0)
                msg.channel.send(`Leave msg is now: ${args.join(" ")}`);
        })
    }
}

module.exports.config = {
    name: "leavemessage",
    aliases: ["leavemessage", "leavemsg"]
}