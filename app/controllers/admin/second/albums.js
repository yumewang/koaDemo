'use strict';

const AlbumService = require('../../../services/albums');

exports.index = async (ctx, next) => {
  let currentPage = ctx.query.page || 1
  let count = parseInt(ctx.query.count) || 10
  let albums = await AlbumService.getList(ctx, next)
  let totalPages = Math.ceil(albums.count / count);
  await ctx.render('admin/albums/index', {albums: {
    page: currentPage,
    count: count,
    total_pages: totalPages,
    data: albums.rows
  }})
}

exports.testForController = async(ctx, next) => {
  ctx.body = {
    title: 'Hello Koa 2 from admin-second!'
  }
}