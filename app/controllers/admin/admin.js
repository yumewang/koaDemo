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
    ctx.body = loginRes
  } catch (e) {
    loginRes.msg = 'Login failure.'
    ctx.body = loginRes
  }
}