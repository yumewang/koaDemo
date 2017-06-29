/* 
  Use 七牛 to upload file
  Please see below:
    七牛doc: https://developer.qiniu.com/kodo/sdk/1289/nodejs
    how to upload: https://chenshenhai.github.io/koa2-note/note/upload/simple.html
*/
const config =  require('../../config')
const qiniu = require('qiniu')
const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')
const crypto = require('crypto')
exports.qiniu = async (ctx, next) => {
  // How to return result by json, please see:
  //    https://chenshenhai.github.io/koa2-note/note/upload/simple.html
  //  and https://chenshenhai.github.io/koa2-note/note/upload/busboy.html
  let result = await uploadFile(ctx, next)
  ctx.body = result
}

function uploadFile(ctx, next) {
  const busboy = new Busboy({ headers: ctx.req.headers })
  return new Promise((resolve, reject) => {
    ctx.req.pipe(busboy)
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      // Save to local
      // file.pipe(fs.createWriteStream(filename))
      let fileSuffix = getSuffixName(filename)
      // Start parse file stream
      file.on('data', function(data) {
        console.log(`File [${fieldname}] got ${data.length} bytes`) 
        uploadToQiniu(data, fileSuffix).then(key => {
          resolve({image: key}) 
        }).catch(err => {
          reject(err)
        })
      })
      // End parsing
      file.on('end', function() {
        console.log(`File [${fieldname}] Finished`)
      })
    })
    busboy.on('finish', function() {
      console.log('finished')
    })
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(err)
    })
  })
}

function uploadToQiniu(file, fileSuffix) {
  return new Promise((resolve, reject) => {
    let suffixFile = fileSuffix
    crypto.pseudoRandomBytes(16, function (err, raw) {
      let key = raw.toString('hex') + '.' + suffixFile
      // DO upload to qiniu
      let mac = new qiniu.auth.digest.Mac(config.qiniu.ak, config.qiniu.sk);
      let options = {
        scope: config.qiniu.bucket,
      };
      let putPolicy = new qiniu.rs.PutPolicy(options);
      let uploadToken = putPolicy.uploadToken(mac);

      let config = new qiniu.conf.Config()
      config.zone = qiniu.zone.Zone_z0
      let formUploader = new qiniu.form_up.FormUploader(config);
      let putExtra = new qiniu.form_up.PutExtra();
      // 文件上传 use 数据流上传（表单方式）
      formUploader.put(uploadToken, key, file, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          throw respErr;
          reject(err);
        }
        if (respInfo.statusCode == 200) {
          resolve(respBody.key);
        } else {
          console.log(respInfo.statusCode, respBody);
          reject(respInfo.statusCode);
        }
      });
    })
  })
}

function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}