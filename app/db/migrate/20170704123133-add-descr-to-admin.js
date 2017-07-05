module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    const { INTEGER, STRING, DATE } = Sequelize;
    return queryInterface.addColumn(
      'admins',
      'descr',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    // TODO: node_modules/.bin/sequelize db:migrate:undo, not working.
    return queryInterface.removeColumn('admins', 'descr');
  }
}