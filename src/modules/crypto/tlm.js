//https://wax.eosrio.io/v2/history/get_actions?account=2bo2q.wam&skip=0&limit=100&sort=desc&after=2021-05-03T03%3A00%3A00.000Z&before=2021-05-05T02%3A59%3A00.000Z&transfer.to=2bo2q.wam

const Discord = require('discord.js');
const axios = require('axios');
var moment = require('moment');

exports.run = (bot, msg, args, mongoose) => {
    let dataInicio, dataFinal;
    let totalTlm = 0;
    let totalMineradas = 0;

    if(!args[0]) {
      msg.channel.send("Ce precisa informar o id da conta WAX assim ó >tlm contawax.wam");
      return;
    }
    if(!args[1]) {
      dataInicio = moment().format('YYYY-MM-DD');
      dataFinal = moment().add(1, "days").format('YYYY-MM-DD');
    } else {
      dataInicio = moment(args[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
      dataFinal = moment(args[1], 'DD/MM/YYYY').add(1, "days").format('YYYY-MM-DD');
    }

    axios.get(`https://wax.eosrio.io/v2/history/get_actions?account=${args[0]}&skip=0&limit=100&sort=desc&after=${dataInicio}T03%3A00%3A00.000Z&before=${dataFinal}T02%3A59%3A00.000Z&transfer.to=${args[0]}`)
    .then(function (response) {
      if(response && response.data && response.data.actions) {
        let actions = response.data.actions;
        for(let mining of actions) {
          if(mining.act && mining.act.data && mining.act.data.from === 'm.federation') {
            totalMineradas++;
            totalTlm = totalTlm + mining.act.data.amount;
          }
        }
        msg.channel.send(`No dia **${moment(dataInicio, 'YYYY-MM-DD').format('DD/MM/YYYY')}** Essa conta minerou **${totalMineradas}** vezes, recebeu um total de **${Number(totalTlm).toFixed(4)}** TLM, com uma média de **${totalMineradas !== 0 ? Number(totalTlm/totalMineradas).toFixed(4) : '0.0000'}** por vez minerada.`);
      }
    })
    .catch(function (error) {
      msg.channel.send("Vish, algo deu errado D:");
    })

}

module.exports.config = {
    name: "tlm",
    aliases: ["tlm"]
}