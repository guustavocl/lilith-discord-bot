const Example = require(process.mainModule.path + '/src/models/example/Example.js')
const GuildMemberAdd = require(process.mainModule.path + '/src/core/events/GuildMemberAdd.js');
const GuildMemberRemove = require(process.mainModule.path + '/src/core/events/GuildMemberRemove.js');

exports.run = (bot, msg, args, mongoose) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("Only admins can use this command, sorry :c");
        return;
    }
    // GuildMemberAdd.handler(bot, msg.member, mongoose);
    // GuildMemberRemove.handler(bot, msg.member, mongoose);
}

module.exports.config = {
    name: "example",
    aliases: ["example", "test"]
}