const Guild = require(process.mainModule.path + '/src/models/guild/Guild.js');
const cfg = require(process.mainModule.path + '/config.json');

exports.run = (bot, msg, args, mongoose) => {
    if(msg.member.id !== cfg.ownerId) {
        return;
    }
    let guild = msg.guild;
    let sql = Guild.find({guildId: guild.id})
    sql.exec((err, values) => {
        if (err) return;
        if(values && values.length > 0) return;

        let newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildId: guild.id,
            name: guild.name,
            ownerID: guild.ownerID,
            isLarge: guild.large,
            joinedTimestamp: guild.joinedTimestamp,
            region: guild.region,
            systemChannelID: guild.systemChannelID,
            icon: guild.icon,
            joinChannel: guild.systemChannelID,
            leaveChannel: guild.systemChannelID,
            prefix: '>'
        })
    
        newGuild.save()
            .then((r) => { 
              msg.channel.send("guild created on db!");
              console.log(r);
            })
            .catch((err) => console.log(err));
    });
}

module.exports.config = {
    name: "createguild",
    aliases: ["craeteg", "cguild"]
}