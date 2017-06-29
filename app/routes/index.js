const router = require('koa-router')()
const multer = require('koa-multer');
// const albumsController = require('../controllers/albums_controller')

const Controller = require('../controllers')
const upload = multer({ dest: './uploads/'})
// const upload = multer({ dest: './uploads/', limits: { fileSize: 30000 } })


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

router.get('api/albums', Controller.Albums.getlist);
router.post('api/albums', Controller.Albums.create);
// router.post('api/upload', upload.single('avatar'), (ctx, next) => {
//   console.log(ctx)
//   ctx.body = "upload is success";
// })

router.post('api/upload', Controller.Albums.uploadImage)
router.post('api/qiniu', Controller.Qiniu.qiniu)

module.exports = router


