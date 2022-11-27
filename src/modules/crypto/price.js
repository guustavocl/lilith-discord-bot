//https://wax.eosrio.io/v2/history/get_actions?account=2bo2q.wam&skip=0&limit=100&sort=desc&after=2021-05-03T03%3A00%3A00.000Z&before=2021-05-05T02%3A59%3A00.000Z&transfer.to=2bo2q.wam
const fetch = require("node-fetch");
const axios = require('axios');
const web3 = require("web3");

let thiefAddress = '0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3';
let rangerAddress = '0xF31913a9C8EFE7cE7F08A1c08757C166b572a937';
let mageAddress = '0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44';
let warriorAddress = '0x22F3E436dF132791140571FC985Eb17Ab1846494';

//"https://market.binaryx.pro/getSales?page=2&page_size=20&status=selling&name=&sort=price&direction=asc&career=0x22F3E436dF132791140571FC985Eb17Ab1846494&value_attr=strength,physique&start_value=90,61&end_value=0,0&pay_addr="
function getFetchUrlByClassAndStats(classe, mainStat, mainStatValue, secondStat, secondStatValue) {
  return `https://market.binaryx.pro/getSales?page=1&page_size=5&status=selling&name=&sort=price&direction=asc&career=${classe}&value_attr=${mainStat},${secondStat}&start_value=${mainStatValue},${secondStatValue}&end_value=0,0&pay_addr=`
}

function fetchApi(url) {
  return new Promise((resolve) => {
    axios.get(url, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en,pt-BR;q=0.9,pt;q=0.8,en-GB;q=0.7,en-US;q=0.6,es;q=0.5",
        "sec-ch-ua": "\"Chromium\";v=\"94\", \"Microsoft Edge\";v=\"94\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "cf_clearance=zRqIpT.aRuPMu4vxF3Bp19YoInu22yrxG2.6qLAwaZw-1636168113-0-150"
      },
      "referrer": "https://market.binaryx.pro/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors"
    }).then(response => {
      if(response) {
        if(response.data?.data?.result?.items) {
          resolve(response.data.data.result.items);
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    })
    .catch(err => {
      console.log('#Erro ao tentar chamar Api');
      resolve(null);
    })
  })
}

exports.run = async(bot, msg, args, mongoose) => {
  // console.log(msg)

  if(msg.author && msg.content.startsWith('>')) {
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray[1];
    if(cmd === '>price' && Number(args)) {
      let description = '';

      //THIEF - 0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3
      let thiefList = await fetchApi(getFetchUrlByClassAndStats(thiefAddress, 'agility', Number(args), 'strength', 61));
      description = description + `\r**THIEF**`;
      if(thiefList)
        for(let item of thiefList) {
          let price = Number(web3.utils.fromWei(item.price, 'ether')).toFixed(2);
          description = description + `\r🧩 LVL ${item.level} 💸 **${price} BNX**\r
            🌎 ${item.total} >>>> **S${item.strength}/A${item.agility}/C${item.physique}/W${item.volition}/I${item.brains}/S${item.charm}**
            https://market.binaryx.pro/#/oneoffsale/detail/${item.order_id}\r`;
        }

      //RANGER - 0xF31913a9C8EFE7cE7F08A1c08757C166b572a937
      let rangerList = await fetchApi(getFetchUrlByClassAndStats(rangerAddress, 'strength', Number(args), 'agility', 61));
      description = description + `\r**RANGER**`;
      if(rangerList)
        for(let item of rangerList) {
          let price = Number(web3.utils.fromWei(item.price, 'ether')).toFixed(2);
          description = description + `\r🧩 LVL ${item.level} 💸 **${price} BNX**\r
            🌎 ${item.total} >>>> **S${item.strength}/A${item.agility}/C${item.physique}/W${item.volition}/I${item.brains}/S${item.charm}**
            https://market.binaryx.pro/#/oneoffsale/detail/${item.order_id}\r`;
        }

      //MAGE - 0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44
      let mageList = await fetchApi(getFetchUrlByClassAndStats(mageAddress, 'brains', Number(args), 'charm', 61));
      description = description + `\r**MAGE**`;
      if(mageList)
        for(let item of mageList) {
          let price = Number(web3.utils.fromWei(item.price, 'ether')).toFixed(2);
          description = description + `\r🧩 LVL ${item.level} 💸 **${price} BNX**\r
            🌎 ${item.total} >>>> **S${item.strength}/A${item.agility}/C${item.physique}/W${item.volition}/I${item.brains}/S${item.charm}**
            https://market.binaryx.pro/#/oneoffsale/detail/${item.order_id}\r`;
        }

      //WARRIOR - 0x22F3E436dF132791140571FC985Eb17Ab1846494
      let warriorList = await fetchApi(getFetchUrlByClassAndStats(warriorAddress, 'strength', Number(args), 'physique', 61));
      description = description + `\r**WARRIOR**`;
      if(warriorList)
        for(let item of warriorList) {
          let price = Number(web3.utils.fromWei(item.price, 'ether')).toFixed(2);
          description = description + `\r🧩 LVL ${item.level} 💸 **${price} BNX**\r
            🌎 ${item.total} >>>> **S${item.strength}/A${item.agility}/C${item.physique}/W${item.volition}/I${item.brains}/S${item.charm}**
            https://market.binaryx.pro/#/oneoffsale/detail/${item.order_id}\r`;
        }

      msg.channel.send({embed: {
        color: 10181046,
        author: {
            name: `Comparativo de preços dos mais baratos`,
        },
        thumbnail: {
          url: 'https://pbs.twimg.com/profile_images/1376839114830438405/CAfFUZXj_400x400.jpg'
        },
        title: `# LOW PRICES COM MAIN STATUS = ${args}`,
        description: description,
        timestamp: new Date(),
        footer: {
            text: `BinaryX Bot`
        }
      }});

    }
  }

}

module.exports.config = {
    name: "price",
    aliases: ["price"]
}