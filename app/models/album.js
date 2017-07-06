// const db = require('../db');
const Sequelize = require('sequelize');
const moment = require('moment');
const { INTEGER, STRING, DATE } = Sequelize;

module.exports = function (sequelize, Sequelize) {
  const Album = sequelize.define('album', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: 'STRING',
      defaultVaule: '',
      comment: '图集标题'
    },
    cover: {
      type: STRING,
      defaultVaule: '',
      comment: '图集封面'
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      comment: '用户ID'
    },
    song_id: {
      type: INTEGER,
      defaultVaule: 0,
      comment: '背景音乐ID'
    },
    visit_count: {
      type: INTEGER,
      defaultVaule: 0,
      comment: '浏览数'
    },
    thumbup_count: {
      type: INTEGER,
      defaultVaule: 0,
      comment: '点赞数'
    },
    max_pos: {
      type: INTEGER,
      defaultVaule: 0,
      comment: '图片内容集数量'
    },
    created_at: {
      type: DATE,
      get() {
        let created_at = this.getDataValue('created_at');
        // createAt is an instance of date, you could operate it with moment library
        // to get ur format
        created_at = moment(created_at).format('YYYY-MM-DD HH:mm:ss')
        return created_at
      }
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
  })

  Album.associate = function (models) {
    Album.hasMany(models.photo, {
      foreignKey: 'album_Id'
    });
    Album.hasMany(models.section);
  }
  return Album;
}

