'use strict';

const models = require('../../models');
const AlbumService = require('../../services/albums');


exports.create = async(ctx, next) => {
  try {
    let album = await AlbumService.createV2(ctx, next)
    ctx.body = {rv: 200, id: album.dataValues.id}
  } catch (e) {
    ctx.body = {rv: 2001, msg: e}
  }
}