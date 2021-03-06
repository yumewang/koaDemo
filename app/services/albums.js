'use strict';

const models = require('../models');

exports.getList = async(ctx, next) => {
  let currentPage = ctx.query.page || 1
  let count = parseInt(ctx.query.count) || 10
  // TODO: https://gist.github.com/yeluolanyan/3346043
  // setOffSet((this.pageNum - 1) * getPageSize());
  let offset = (currentPage - 1) * count || 0
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

exports.createV2 = async(ctx, next) => {
  let requestParam = ctx.request.body
  // Create album
  let album = await models.album.create(requestParam)
  if (requestParam.section.length > 0) {
    let albumId = album.dataValues.id
    let sections = requestParam.section
    let photos = []
    let videos = []
    for(let i = 0; i < sections.length; i++) {
      let item = sections[i]
      item.section_type = item.type
      item.album_id = albumId
      let section = await models.section.create(item);
      // console.log('111 ', section)
      let sectionId = section.dataValues.id
      item.section_id = sectionId
      if (item.type === 'photo') {
        photos.push(item)
      } else if (item.type === 'video') {
        videos.push(item)
      }
    }
    // Parse photos data, and create photos with section_id
    let photosData = []
    photos.forEach(function(item) {
      item.images.forEach(function(image) {
        image.album_id = albumId
        image.section_id = item.section_id
        photosData.push(image)
      })
    })
    await models.photo.bulkCreate(photosData)
    // Create videos with section_id
    await models.video.bulkCreate(videos)
    return album
  }
}

exports.getById = async(ctx, next) => {
  let albumId = ctx.params.id
  let album = await models.album.find({
    where: { id: albumId },
    include: [
      {
        model: models.section,
        attributes: ['section_type', 'content', 'pos'],
        include: [
          {
            model: models.photo,
            attributes: ['image', 'pos', 'caption', 'filter'],
          },
          {
            model: models.video,
            attributes: ['video', 'cover', 'width', 'height', 'size', 'length']
          }
        ]
      }
    ]
  })
  return album
}


