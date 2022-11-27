const User = require(process.mainModule.path + '/src/models/user/User.js');

exports.run = (bot, msg, args, mongoose) => {
    let sql = User.find({userId: msg.author.id})
    sql.exec((err, values) => {
        if (err) return;
        if(values && values.length === 0) return;

        msg.channel.send(`<@${msg.author.id}> you have <:money_with_wings:683480378358628393> **${values[0].credits}** credits!! wow`);
    });

}

module.exports.config = {
    name: "credits",
    aliases: ["credits"]
}