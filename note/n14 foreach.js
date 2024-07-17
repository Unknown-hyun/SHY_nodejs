const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const port = 3000;
const app = express();
const path = require("path");

app.get("/", (req, res) => {
  res.send(
    `<h1>안녕하세요! Express로 만든 서버입니다.</h1><br><h2><a href="/list">파일리스트로</a></h2>`
  );
});

app.use("/list", express.static(__dirname));
app.get("/list", (req, res) => {
  fs.readdir(__dirname, "utf-8", (err, data) => {
    console.log(__dirname);
    let list = "<h1>파일 리스트</h1>";
    data.forEach((v, i) => {
      list += `<br> ${
        i + 1
      } <a href="${v}">${v}</a>   <a href="${v}" download style="text-decoration:none">다운로드</a>`;
    });
    res.send(list);
  });
});

app.listen(3000, () => {
  console.log(`${port} 포트로 서버가 실행 중입니다.`);
});
