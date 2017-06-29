'use strict';

const models = require('../models');

exports.getList = async(ctx, next) => {
  let currentPage = ctx.query.page || 1
  let count = parseInt(ctx.query.count) || 10
  // TODO: https://gist.github.com/yeluolanyan/3346043
  // setOffSet((this.pageNum - 1) * getPageSize());
  let offset = (currentPage - 1) * count || 0
  console.log(models.album)
  return await models.album.findAndCount({
    attributes: ['id', 'title', 'visit_count', 'thumbup_count', 'cover', 'max_pos', 'created_at'],
    limit: count, 
    offset: offset,
    distinct: true, 
    order: [['created_at', 'DESC']],
    include: {
      model: models.photo,
      attributes: [ 'image' ]
    }
  })
}

exports.create = async(ctx, next) => {
  console.log(ctx.request.body)
  let requestParam = ctx.request.body
  let album = await models.album.create(requestParam)
  if (requestParam.data.length > 0){
    let albumId = album.dataValues.id
    let photos = requestParam.data
    photos.forEach(function(item) {
      item.album_Id = albumId
      item.section_Id = 1
    })
    await models.photo.bulkCreate(photos)
  }
  return album
}