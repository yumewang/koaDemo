'use strict';

const AdminsService = require('../../services/admins');

exports.loginPage = async(ctx, next) => {
  await ctx.render('admin/login')
}

exports.login = async(ctx, next) => {
  let loginRes = {
    rv: '200',
    msg: 'Success'
  }
  // Validate user and password
  if (ctx.query.user === undefined || ctx.query.user === '') {
    loginRes.rv = '20001'
    loginRes.msg = 'User wrong.'
    ctx.body = loginRes
    return
  }
  if (ctx.query.password === undefined || ctx.query.password === '') {
    loginRes.rv = '20001'
    loginRes.msg = 'Password wrong.'
    ctx.body = loginRes
    return
  }
  try {
    let admin = await AdminsService.login(ctx, next)
    if (admin === null) {
      loginRes.rv = '20001'
      loginRes.msg = 'The user is not exist.'
      ctx.body = loginRes
      return
    }
    console.log(admin)
    // Create session info, after login in.
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = loginRes
  } catch (e) {
    loginRes.rv = '20001'
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


