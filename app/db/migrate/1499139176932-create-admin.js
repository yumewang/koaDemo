module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const { INTEGER, STRING, DATE } = Sequelize;
    queryInterface.createTable(
      'admins', {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        avatar: {
          type: STRING,
          defaultVaule: '',
          comment: '用户头像'
        },
        name: {
          type: STRING,
          defaultVaule: '',
          comment: '用户名称'
        },
        password: {
          type: STRING,
          defaultVaule: '',
          comment: '用户密码'
        },
        created_at: {
          type: DATE
        },
        updated_at: {
          type: DATE
        }
      })
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
   return retqueryInterface.dropTable('admins')
  }
}