// const db = require('../db');
const Sequelize = require('sequelize');
const { INTEGER, STRING, DATE } = Sequelize;

module.exports = function (sequelize, Sequelize) {
  const Video = sequelize.define('video', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    video: {
      type: 'STRING',
      defaultVaule: '',
      comment: '视频地址'
    },
    cover: {
      type: 'STRING',
      defaultVaule: '',
      comment: '封面地址'
    },
    width: {
      type: 'STRING',
      defaultVaule: '',
      comment: '视频宽度'
    },
    height: {
      type: 'STRING',
      defaultVaule: '',
      comment: '视频高度'
    },
    size: {
      type: 'STRING',
      defaultVaule: '',
      comment: '视频大小'
    },
    length: {
      type: INTEGER,
      defaultVaule: '',
      comment: ''
    },
    section_id: {
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
        fields: ['videos_section_id']
      }
    ]
  });

  return Video;
}
