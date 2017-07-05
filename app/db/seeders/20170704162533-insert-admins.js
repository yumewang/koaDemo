'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('admins', [
        { name: "admin1", 
          password: "123456", 
          descr: '11111', 
          created_at: new Date(), 
          updated_at: new Date()
        },
        { name: "admin2", 
        password: "123456", 
        descr: '222222', 
        created_at: new Date(), 
        updated_at: new Date() 
      }
    ]);
  },
  down: function (queryInterface, Sequelize) {
    // return queryInterface.dropTable('Admins');
  }
};