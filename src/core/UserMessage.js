const User = require(process.mainModule.path + '/src/models/user/User.js');
const Inventory = require(process.mainModule.path + '/src/models/user/Inventory.js');

exports.handler = async (bot, msg, mongoose) => {
    if(!msg.member || !msg.member.user)
        return;

    let sql = User.find({ userId: msg.member.user.id })
    sql.exec((err, values) => {
        if (err) return;
        if (values && values.length === 0 ) {
            console.log(`novo usuario: ${msg.member.user.username} #${msg.member.user.discriminator}`);
            let newUser = new User({
                _id: mongoose.Types.ObjectId(),
                userId: msg.member.user.id,
                username: msg.member.user.username,
                discriminator: msg.member.user.discriminator,
                avatar: msg.member.user.avatar,
                bot: msg.member.user.bot,
                credits: 0,
                level: 1,
                levelExp: 0,
                totalExp: 0,
                createdAt: msg.member.user.createdAt
            });

            newUser.save()
            .then((r) => {
                let inventory = new Inventory({
                    _id: mongoose.Types.ObjectId(),
                    userId: r._id,
                    credits: 0
                });
                inventory.save()
                    .then((r) => console.log('new user and inventory'))
                    .catch((err) => console.log(err));
                }
            ).catch((err) => console.log(err));
            return;
        }
        // console.log('usuario ja cadastrado');
    });
}