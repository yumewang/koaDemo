/*
  Please see here: https://github.com/adamchenjiawei/koa2_study/blob/master/app/controllers/index.js
*/
const fs = require('fs');
const path = require('path');
const basename  = path.basename(module.filename);
let controllers = {};

autoController(controllers, __dirname)

function autoController(parent, filePath) {
  fs
    .readdirSync(filePath)
    .filter(function(file) {
      var stat = fs.lstatSync(`${filePath}/${file}`);
      if (stat.isDirectory()){
        parent[file] = {};
        autoController(parent[file], `${filePath}/${file}`);
      }
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
      let model = require(path.join(filePath, file));
      parent[file.split('.js')[0]] = model;
    });
}

module.exports = controllers;

