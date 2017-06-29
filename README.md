# Koa learning five days

#### We three:
- [adamchen](https://github.com/adamchenjiawei): https://github.com/adamchenjiawei/koa2_study
- 

[TOC]
### 1. 基础知识
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

### 2. 实现图集列表及分页-HTTP GET （Sequelize）
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
    - (实现自动挂载路由)[http://i5ting.github.io/stuq-koa/moa2/mount-routes.html]
- 实现数据联调查询，优化返回数据






![Hello world](https://github.com/yumewang/koaDemo/blob/master/public/images/hello-cover.png)