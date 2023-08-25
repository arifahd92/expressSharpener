const path = require('path');

module.exports = path.dirname(process.mainModule.filename);
//this will always refer to main module  where ever it will be imported
//main module is module from where code exicution starts ex node app.js,here app.js is main module 