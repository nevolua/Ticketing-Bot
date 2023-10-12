const fs = require('fs');

const components = require('../components/export');
const utils = require('../utils');

const settings = JSON.parse(fs.readFileSync('config.json'))
async function exec(client) {
  
  const stockChannel = await client.channels.cache.get(settings.stockChannel);
  
  await utils.purge(stockChannel);
  
  const embedData = components.stockEmbed.embed();
      
  await stockChannel.send(embedData);
  
}

module.exports = { exec }