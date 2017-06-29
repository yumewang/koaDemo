# Koa learning five days

koa2 + sequelize + mysql + nunjucks

### We three (Two heads are always better then one):
- [adamchen](https://github.com/adamchenjiawei): https://github.com/adamchenjiawei/koa2_study
- [TODO]()

## 1. 基础知识

- 学习MySQL
- 浏览 KOA，及 Nodejs
    - [StuQ Koa在线课程](http://i5ting.github.io/stuq-koa/index.html)
    - [koa2进阶学习笔记](https://chenshenhai.github.io/koa2-note/)
- 学习 ES6 新语法：async, generator 等
- 系统学习 HTTP 请求
    - [MDN-Web 技术文档-HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
    - [一次完整的HTTP请求过程](https://foofish.net/http-request-process.html)
    - [HTTP 协议入门](http://www.ruanyifeng.com/blog/2016/08/http.html)
    - [HTTP协议的前身今世](https://github.com/muwenzi/Program-Blog/issues/35)
- 安装MySQL可视化工具 Sequel （自定）
- 使用 Postman api请求工具（或HTTPie），用于验证 API 正确性
- 所需遵循的代码规范
    -[node-style-guide](https://github.com/dead-horse/node-style-guide)


## 2. 实现图集列表及分页-HTTP GET （Sequelize）

- 创建数据库，及导入已提供的数据库sql
- koa-generator 命令创建项目：
  ```
    koa2 koaDemo
  ```
- 变更项目结构为 MVC 结构
- Koa, 数据库MySQL，如何使用 Sequelize 完成数据连接
- 如何定义 model 数据定义 - 图集表 model/albums.js
- 定义图集 Service： service/albums_cervie.js
- 定义图集 Controller：controller/albums_controller.js
- 定义图集 routes：routes/index
- 实现获取所有图集列表(Json对象)
- 实现图集列表分页
- 利用 mount-koa-routes 实现自动挂载路由
    - [实现自动挂载路由](http://i5ting.github.io/stuq-koa/moa2/mount-routes.html)
- 实现数据联调查询，优化返回数据

## 3. 实现图集新增-HTTP POST

- 简单 form POST 请求
- 使用 koa-multer 实现本地上传文件
  - [http实践-上传](http://i5ting.github.io/stuq-koa/koa-practice/http-practice.html)
  - 如何处理图片上传时异常，及文件大小限制？
    - [Multer test file: error-handling.js](https://github.com/koa-modules/multer/blob/master/test/error-handling.js)
    - [Multer 中文档](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)
  - 分析 koa-multer 源码
  ```
    源码如下：
    function makePromise(multer, name) {
      if (!multer[name]) return

      const fn = multer[name]

      multer[name] = function () {
        const middleware = fn.apply(this, arguments)

        return (ctx, next) => {
          return new Promise((resolve, reject) => {
            middleware(ctx.req, ctx.res, (err) => {
              err ? reject(err) : resolve(ctx)
            })
          }).then(next)
        }
      }
    }

    app/controller/albums.js 中上传处理如下：
    exports.uploadImage = async (ctx, next) => {
      await upload.single('avatar')(ctx, next).then(() => {
        ctx.body = {file: ctx.req.file.path};
      }).catch(err => {
        ctx.body = err;
      })
    }
  ```
- 图片上传新增API - 七牛云
- 明确如何解析 http 请求参数: field, file

## 4. View 层定义 - 集成 nunjucks

- 引入 [koa-nunjucks-2](https://github.com/strawbrary/koa-nunjucks-2)
- [Getting Started with nunjucks](https://mozilla.github.io/nunjucks/getting-started.html)
- 引入 [nodemon.json](https://github.com/yumewang/koaDemo/blob/master/nodemon.json) ，更改 .html 文件自动重启应用
- See results: ** 你好，世界！**
  ![Hello world](https://github.com/yumewang/koaDemo/blob/master/public/images/hello-world.png)
  ![Hello Cover](https://github.com/yumewang/koaDemo/blob/master/public/images/hello-cover.png)
  You need know why I choose this image. Do it, smile, face all of challenges.
  ![Hello routes](https://github.com/yumewang/koaDemo/blob/master/public/images/hello-routes.png)