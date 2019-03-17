const express = require('express');
const app = express();

app.get('/idol-picture', function (req, res) {
  const option = req.query;
  const data = { "data": [] };
  for (let i = 0; i < (Number(option.num) || 10); i++) {
    data.data.push({
      url: 'http://www.xuwanwan.com/picture/lovelive000' + ~~(Math.random() * 100) + '.png',
      alt: 'lovelive'
    });
  }
  res.send(JSON.stringify(data));
});


var fs = require('fs');
var request = require("request");

const paddZoro = (num) => {
  let temp = '' + num;
  let len = temp.length;
  for (let i = 0; i < 4 - len; i++) {
    temp = '0' + temp;
  }
  return temp;
};


const downloadImg = (num) => {
  let src = 'http://zh.webmist.net/data/images/love_live/lovelive' + paddZoro(num) + '.jpg';
  let writeStream = fs.createWriteStream('lovelive' + paddZoro(num) + '.jpg');
  let readStream = request(src);
  readStream.pipe(writeStream);
  readStream.on('end', function () {
    console.log('文件下载成功');
  });
  readStream.on('error', function (err) {
    console.log("错误信息:" + err)
  })
  writeStream.on("finish", function () {
    console.log("文件写入成功");
    writeStream.end();
  });
};

for (let i = 0; i < 1000; i++) {
  downloadImg(i);
}

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port
})
