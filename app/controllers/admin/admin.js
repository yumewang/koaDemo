'use strict';

const AdminsService = require('../../services/admins');

exports.login = async(ctx, next) => {
  let loginRes = {
    rv: '200',
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
    // Create session info, after login in.
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = loginRes
  } catch (e) {
    loginRes.msg = 'Login failure.'
    ctx.body = loginRes
  }
}

exports.logout = async(ctx, next) => {
  let logoutRes = {
    rv: '200',
    msg: 'logout Success'
  }
  ctx.session = null
  ctx.body = logoutRes
}


