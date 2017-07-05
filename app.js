const Koa = require('koa')
const app = new Koa()
const session = require("koa-session2");
const koaNunjucks = require('koa-nunjucks-2');
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mount = require('mount-koa-routes');
const path = require('path');
const Store = require("./app/Store");
// const index = require('./routes/index')
// const users = require('./routes/users')

// error handler
onerror(app)

// middlewares

app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, '/app/views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(session({
  store: new Store()
}));


// logger
app.use(async (ctx, next) => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;
  let user = ctx.session.user;
  // All of admin pages need to check if us has logged in, except login page.
  if (!/\/login/.test(ctx.url) && /\/admin\//.test(ctx.url) && user === undefined) {
    // user has not logged in
    ctx.body = {
      rv: '200',
      msg: 'user has not logged in.'
    }
    return
  } else {
    // user has already logged in
  }
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
mount(app,  __dirname + '/app/routes', true);

module.exports = app
