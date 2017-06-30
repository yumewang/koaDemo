const Koa = require('koa')
const app = new Koa()
const koaNunjucks = require('koa-nunjucks-2');
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mount = require('mount-koa-routes');
const path = require('path');
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

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
mount(app,  __dirname + '/app/routes', true);

module.exports = app
