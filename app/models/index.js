const db = require('../db');
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = db.sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  // console.log(db[modelName].associate1())
  if (db[modelName].associate) {
    db[modelName].associate(db);
    console.log(db[modelName])
  }
});

module.exports = db