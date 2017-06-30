'use strict';
const multer = require('koa-multer')
const crypto = require('crypto')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let suffixFile = file.originalname.split('.')[1]
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(err, err ? undefined : raw.toString('hex') + '.' + suffixFile)
    })
    // cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({
  storage: storage
})
// const upload = multer({ dest: 'uploads/' })
const models = require('../models');
const AlbumService = require('../services/albums');

exports.getlist = async (ctx, next) => {
  let albums = await AlbumService.getList(ctx, next)
  ctx.body = albums
}

exports.create = async (ctx, next) => {
  try {
    let userId = ctx.request.body.user_id
    if ( userId == undefined || userId == '') {
      ctx.body = {rv: 2001, msg: 'userId can not blank'}
      return 
    }
    let user = await models.user.findById(userId)
    if (user == null) { 
      ctx.body = {rv: 2001, msg: 'user can not exsited'}
      return
    }
    let album = await AlbumService.create(ctx, next)
    ctx.body = {rv: 200, id: album.dataValues.id}
  } catch (e) {
    ctx.body = {rv: 2001, msg: e}
  }
}

exports.uploadImage = async (ctx, next) => {
  await upload.single('avatar')(ctx, next).then(() => {
    ctx.body = {file: ctx.req.file.path};
  }).catch(err => {
    ctx.body = err;
  })
}

exports.testForController = async(ctx, next) => {
  ctx.body = {
    title: 'Hello Koa 2 from outside!'
  }
}
