const config =  require('../../config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',
  pool: { // TODO: why do define this pool
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize