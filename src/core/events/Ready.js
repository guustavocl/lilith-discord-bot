exports.run = async (bot) => {
    console.log('Im ready in hell!! hunting in ' + bot.guilds.array().length + ' guilds.');
    
    bot.user.setStatus('online', '');
    
    bot.user.setPresence({ game: { name: '>help' }, status: 'online' })
    .then(console.log('status changed'))
    .catch(console.error)
}