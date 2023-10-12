const fs = require('fs');
const path = require('path');


var requires = {};

fs.readdirSync(__dirname).forEach(file => {
  if(file !== 'export.js') {
    requires[file.replace('.js', '')] = require(path.join(__dirname, file));
  }
});

module.exports = requires;