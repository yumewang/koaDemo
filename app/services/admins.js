'use strict';

const models = require('../models');

exports.login = async(ctx, next) => {
  let userName = ctx.query.user
  let password = ctx.query.password
  // search for attributes
  return await models.admin.findOne({ where: {name: userName, password: password} })
}