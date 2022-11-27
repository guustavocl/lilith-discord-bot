const Guild = require(process.mainModule.path + '/src/models/guild/Guild.js');
const moment = require('moment');

exports.handler = async (bot, member, mongoose) => {
    let sql = Guild.find({guildId: member.guild.id})
    sql.exec((err, values) => {
        if (err) return;
        if(values && (values.length === 0 || !values[0].leave )) return;

        let channel = member.guild.channels.get(values[0].leaveChannel)
        if(channel != null) {
            channel.send({embed: {
                color: 16711680,
                author: {
                    name: `${member.user.tag} tá indo embora, tsc.`,
                    icon_url: member.user.avatarURL
                },
                title: `${values[0].leaveMsg}`,
                description: `<@${member.user.id}>`,
                thumbnail: {
                    url: member.user.avatarURL
                },
                image: {
                    url: `attachment://leave1.gif`
                },
                timestamp: new Date(),
                footer: {
                    text: `ID: ${member.id} created: ${moment(member.user.createdAt).fromNow()} (${member.user.createdAt.toLocaleDateString()})`
                }
            },
            files: [{
              attachment: `./assets/imgs/leave1.gif`,
              name: `leave1.gif`
            }]
            }).then().catch(console.error);
        }
    });
}