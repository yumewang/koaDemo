const router = require('koa-router')()
const Controllers = require('../controllers')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// Get albums with page & count
router.get('api/albums', Controllers.albums.getlist)
// Create albums
router.post('api/albums', Controllers.albums.create)
router.post('api/v2/albums', Controllers.v2.albums.create)
router.get('api/v2/albums/:id', Controllers.v2.albums.getbyId)
// Upload file to diskStorage with koa-multer
router.post('api/upload', Controllers.albums.uploadImage)
// Upload file to Qiniu
router.post('api/qiniu', Controllers.qiniu.qiniu)
// Route for admin
router.get('admin/login', Controllers.admin.admin.login)
router.get('admin/logout', Controllers.admin.admin.logout)
router.get('admin/login-page', Controllers.admin.admin.loginPage)
router.get('admin/albums', Controllers.admin.albums.index)


// Route for auto-controller
router.get('auto/con', Controllers.albums.testForController)
router.get('auto/con2', Controllers.admin.albums.testForController)
router.get('auto/con3', Controllers.admin.second.albums.testForController)
module.exports = router


