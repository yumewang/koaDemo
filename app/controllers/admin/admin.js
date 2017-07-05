'use strict';

const AdminsService = require('../../services/admins');

exports.loginPage = async(ctx, next) => {
  await ctx.render('admin/login')
}

exports.login = async(ctx, next) => {
  let loginRes = {
    rv: '20001',
    msg: 'Success'
  }
  // Validate user and password
  if (ctx.query.user === undefined || ctx.query.user === '') {
    loginRes.msg = 'User wrong.'
    ctx.body = loginRes
    return
  }
  if (ctx.query.password === undefined || ctx.query.password === '') {
    loginRes.msg = 'Password wrong.'
    ctx.body = loginRes
    return
  }
  try {
    let admin = await AdminsService.login(ctx, next)
    if (admin === null) {
      loginRes.msg = 'The user is not exist.'
      ctx.body = loginRes
      return
    }
    loginRes.rv = '200'
    ctx.session.user = { name: ctx.query.user };
    ctx.body = loginRes
  } catch (e) {
    loginRes.msg = 'Login failure.'
    ctx.body = loginRes
  }
}

exports.logout = async(ctx, next) => {
  // let logoutRes = {
  //   rv: '200',
  //   msg: 'logout Success'
  // }
  ctx.session = null
  await ctx.render('admin/login')
}


