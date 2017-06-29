const router = require('koa-router')()
const Controller = require('../controllers')

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
router.get('api/albums', Controller.Albums.getlist)
// Create albums
router.post('api/albums', Controller.Albums.create)
// Upload file to diskStorage with koa-multer
router.post('api/upload', Controller.Albums.uploadImage)
// Upload file to Qiniu
router.post('api/qiniu', Controller.Qiniu.qiniu)

module.exports = router


