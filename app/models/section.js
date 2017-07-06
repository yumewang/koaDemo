const Sequelize = require('sequelize');
const { INTEGER, STRING, DATE } = Sequelize;

module.exports = function (sequelize, Sequelize) {
  const Section = sequelize.define('section', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    section_type: {
      type: 'STRING',
      defaultVaule: '',
      comment: '段落类型'
    },
    content: {
      type: 'STRING',
      defaultVaule: '',
      comment: '图片标题'
    },
    pos: {
      type: INTEGER,
      defaultVaule: '',
      comment: ''
    },
    album_id: {
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
        fields: ['sections_album_id'] // TODO: What is this?
      }
    ]
  });

  Section.associate = function (models) {
    Section.belongsTo(models.album)
    Section.hasMany(models.video);
    Section.hasMany(models.photo);
  }

  return Section;
}
