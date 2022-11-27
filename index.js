'use strict'
const cfg = require('./config.json');
const mongoose = require('mongoose');
const Discord = require('discord.js');

// Mongoose connect function. For now it's a lifetime connection, maybe tha's not the best option, dunno.
const MongoConnect = require('./src/core/MongoConnect.js');

// All the required events.
const Ready = require('./src/core/events/Ready.js');
const GuildCreate = require('./src/core/events/GuildCreate.js');
const GuildMemberAdd = require('./src/core/events/GuildMemberAdd.js');
const GuildMemberRemove = require('./src/core/events/GuildMemberRemove.js');
const Message = require('./src/core/events/Message.js');

//Some core handlers
const UserMessage = require('./src/core/UserMessage.js');

// Discord client declaration, disabledEvents and cache settings are the most important things here.
const bot = new Discord.Client({
  messageCacheMaxSize: 4048,
  messageCacheLifetime: 1680,
  messageSweepInterval: 2600,
  disableEveryone: true,
  fetchAllMembers: false,
  disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking', 'guildMemberUpdate']
});

//control the cooldown, NO SPAM u.u
let cooldown = new Set();
let seconds = 1;

// Discord event - 'ready', after a sucessfully login
bot.on('ready', function () {
  MongoConnect.run(mongoose);
  Ready.run(bot);
  Message.run();
})

// Discord event - 'message', handle all messages send by uses.
bot.on('message', msg => {
  //check if the user is in the cooldown list, then add his id to the list
  if (cooldown.has(msg.author.id)) return;
  cooldown.add(msg.author.id);

  Message.handler(bot, msg, mongoose);
  UserMessage.handler(bot, msg, mongoose);

  //timeout to remove user id from the cooldown list
  setTimeout(() => {
    cooldown.delete(msg.author.id);
  }, seconds * 1000);

});

// Discord event - 'guildCreate', handle when client joins a guild.
bot.on('guildCreate', guild => {
  GuildCreate.handler(bot, guild, mongoose);
});

// Discord event - 'guildMemberAdd', handle when a new user joins the guild.
bot.on('guildMemberAdd', member => {
  GuildMemberAdd.handler(bot, member, mongoose);
});

// Discord event - 'guildMemberRemove', handle when a new user left the guild.
bot.on('guildMemberRemove', member => {
  GuildMemberRemove.handler(bot, member, mongoose);
});

// Discord event - 'guildUpdate', handle when guild is updates.
bot.on('guildUpdate', (oldGuild, newGuild) => {
  // console.log(newGuild);
  // GuildMemberRemove.handler(bot, member, mongoose);
});

// Discord event - 'error', TODO: implement a file logger.
bot.on('error', (err) => {
  console.log('=========ERROR=========');
  console.log(err);
  console.log('========END ERROR======”');
});

// Discord event - 'disconnected'
bot.on('disconnected', () => {
  console.log('Disconnected!');
});

// Login
// bot.login(cfg.devtoken);
bot.login(cfg.token);
