const User = require(process.mainModule.path + '/src/models/user/User.js');
const moment = require('moment');

exports.run = (bot, msg, args, mongoose) => {
    let sql = User.find({userId: msg.author.id})
    sql.exec((err, values) => {
        if (err) return;
        if(values && values.length === 0) return;

        if(values[0].lastDaily) {
            let dailyDate = new Date(values[0].lastDaily)
            dailyDate.setDate(dailyDate.getDate() + 1)
            
            if(new Date() < dailyDate) {
                let nextDaily = Math.abs(dailyDate - new Date());
                let horas = Math.floor(nextDaily/1000/60/60);
                let minutos = Math.floor((nextDaily/1000/60/60 - horas)*60);
                let segundos = Math.floor(((nextDaily/1000/60/60 - horas)*60 - minutos)*60);
    
                msg.channel.send(`<@${msg.author.id}> your next daily is in ${horas > 0 ? '**'+horas+'**' + ' hours, ' : ''}${minutos > 0 ? '**'+minutos+'**' + ' minutes, and ' : ''}${segundos > 0 ? '**'+segundos+'**' + ' seconds.' : ''}`);
                return;
            }
        }

        let credits = Math.floor(Math.random() * (1500 - 200 + 1)) + 200;
        User.where('userId', msg.author.id).updateOne({$set: {credits: values[0].credits + credits, lastDaily: new Date()}}, (err, count) => {
            if(err) return;
            if(count.ok > 0)
                msg.channel.send(`<@${msg.author.id}> you received <:money_with_wings:683480378358628393> **${credits}** credits! ;)`);
        })
    });
}

module.exports.config = {
    name: "daily",
    aliases: ["daily"]
}