// const db = require('../db');
const Sequelize = require('sequelize');
const { INTEGER, STRING, DATE } = Sequelize;

module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    avatar: {
      type: 'STRING',
      defaultVaule: '',
      comment: '用户头像'
    },
    name: {
      type: 'STRING',
      defaultVaule: '',
      comment: '用户名称'
    },
    created_at: {
      type: DATE
    },
    updated_at: {
      type: DATE
    }
  }, {
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    index: [
      {
        fields: ['user_id']
      }
    ]
  });

  return User;
}
