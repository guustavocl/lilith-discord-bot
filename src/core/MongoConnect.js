const cfg = require('../../config.json');

exports.run = async (mongoose) => {
    mongoose.connect(`mongodb://${cfg.mongoHost}:${cfg.mongoPort}/${cfg.mongoDb}`, { 
      auth: {
        authdb: "lilith",
        user: cfg.mongoUser,
        password: cfg.mongoPwd
      },
      user: cfg.mongoUser,
      pass: cfg.mongoPwd,
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      poolSize: 10 // Maintain up to 10 socket connections 
  })
  .then((e) => {
    console.log(`Conectado com sucesso em mongo db: ${cfg.mongoDb}`);
  }).catch((err) => console.log(err));
}