const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const cfg = require(process.mainModule.path + '/config.json');
const Guild = require(process.mainModule.path + '/src/models/guild/Guild.js');

prefix = cfg.prefix;
commands = new Discord.Collection();
aliases = new Discord.Collection();

let recursiveLoad = (recursive, filePath = '') => {
  let files = fs.readdirSync(path.join(__dirname, filePath, recursive));
  for (let file of files) {
    let finalPath = path.join(filePath, recursive);
    if (fs.statSync(path.join(__dirname, finalPath, file)).isDirectory()) {
      recursiveLoad(file, finalPath);
    } else {
      checkFile(file, finalPath);
    }
  }
}

let checkFile = (file, filePath = '') => {
  if (file.endsWith('.js')) {
    let pull = require(path.join(__dirname, filePath, file));
    if (pull && pull.config) {
      commands.set(pull.config.name, pull);
      pull.config.aliases.forEach(alias => {
        aliases.set(alias, pull.config.name);
      });
    }
  }
}

exports.run = () => {
  recursiveLoad('../../modules');
}

exports.handler = async (bot, msg, mongoose) => {
  if (msg.content.startsWith('<@' + bot.user.id + '>') || msg.content.startsWith('<@!' + bot.user.id + '>')) {
    // is bot mention, do nothing yet
    return;
  }
  if(msg.member && msg.member.id === cfg.ownerId && msg.content.startsWith('>>')) {
    try {
      let messageArray = msg.content.split(" ");
      let cmd = messageArray[0];
      let args = messageArray.slice(1);
      let command = commands.get(aliases.get(cmd.slice(2).toLowerCase()));

      if (command) {
        command.run(bot, msg, args, mongoose);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    if(msg.guild) {
      let sql = Guild.find({ guildId: msg.guild.id })
      sql.exec((err, values) => {
        if (err) return;
        if (values && values.length === 0) return;
        if (!msg.content.startsWith(values[0].prefix))
          return;
        else {
          try {
            let messageArray = msg.content.split(" ");
            let cmd = messageArray[0];
            let args = messageArray.slice(1);
            let command = commands.get(aliases.get(cmd.slice(values[0].prefix.length).toLowerCase()));
    
            if (command)
              command.run(bot, msg, args, mongoose);
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  }
}