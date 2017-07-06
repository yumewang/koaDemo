const Koa = require('koa')
const app = new Koa()
const session = require('koa-session');
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
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
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

app.keys = ['koa_demo_1499239529916'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app.use(session(CONFIG, app));

// logger
app.use(async (ctx, next) => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;
  // All of admin pages need to check if us has logged in, except login page.
  if (!/\/login/.test(ctx.url) && /\/admin\//.test(ctx.url) && ctx.session.isNew) {
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
