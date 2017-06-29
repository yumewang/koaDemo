// const db = require('../db');
const Sequelize = require('sequelize');
const { INTEGER, STRING, DATE } = Sequelize;

module.exports = function (sequelize, Sequelize) {
  const Photo = sequelize.define('photo', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: 'STRING',
      defaultVaule: '',
      comment: '图片地址'
    },
    caption: {
      type: 'STRING',
      defaultVaule: '',
      comment: '图片标题'
    },
    pos: {
      type: INTEGER,
      defaultVaule: '',
      comment: ''
    },
    filter: {
      type: 'STRING',
      defaultVaule: '',
      comment: ''
    },
    album_Id: {
      type: INTEGER,
      allowNull: false,
      comment: '图集ID'
    },
    section_Id: {
      type: INTEGER,
      allowNull: false,
      comment: '图集ID'
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

  Photo.associate = function (models) {
    Photo.belongsTo(models.album, {
      foreignKey: 'album_Id',
    });
  }

  return Photo;
}
