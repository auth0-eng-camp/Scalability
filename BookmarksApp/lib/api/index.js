const fs = require('fs');

module.exports = function(app) {
  fs.readdirSync(__dirname).forEach(f => {
    if (f === 'index.js') return;
    require('./' + f)(app);
  });
};
