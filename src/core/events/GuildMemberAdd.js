const Guild = require(process.mainModule.path + '/src/models/guild/Guild.js');
const moment = require('moment');

exports.handler = async (bot, member, mongoose) => {
    let sql = Guild.find({guildId: member.guild.id})
    sql.exec((err, values) => {
        if (err) return;
        if(values && (values.length === 0 || !values[0].join )) return;

        let channel = member.guild.channels.get(values[0].joinChannel)
        if(channel != null) {
            channel.send({embed: {
                color: 39423,
                author: {
                    name: `Bem vindo, ${member.user.tag}!!`,
                    icon_url: member.user.avatarURL
                },
                title: `${values[0].joinMsg}`,
                description: `<@${member.user.id}>`,
                thumbnail: {
                    url: member.user.avatarURL
                },
                image: {
                    url: `attachment://join1.gif`
                },
                timestamp: new Date(),
                footer: {
                    text: `ID: ${member.id} created: ${moment(member.user.createdAt).fromNow()} (${member.user.createdAt.toLocaleDateString()})`
                }
            },
            files: [{
              attachment: `./assets/imgs/join1.gif`,
              name: `join1.gif`
            }]
            }).then().catch(console.error);
        }
    });
}