/*
  Please see here: https://github.com/adamchenjiawei/koa2_study/blob/master/config/index.js
*/
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const config = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let configBy = require(path.join(__dirname, file));
    config[file.split('.js')[0]] = configBy;
  });

console.log('we are here: ', process.env.NODE_ENV)

module.exports = config[process.env.NODE_ENV]