const User = require(process.mainModule.path + '/src/models/user/User.js');
const moment = require('moment');

exports.run = (bot, msg, args, mongoose) => {
    if(args && args.length > 0) {
        User.where('userId', msg.author.id).updateOne({$set: {backgroundImg: args[0].replace(/\D/g,'')}}, (err, count) => {
            if(err) return;
            if(count.ok > 0)
                msg.channel.send(`Profile background updated!`);
        })
    }
}

module.exports.config = {
    name: "setbackground",
    aliases: ["setbg"]
}