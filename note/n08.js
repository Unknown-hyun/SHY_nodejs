const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("어세오세요. express로 작동하는 서버입니다");
});

app.get("/doc", (req, res) => {
  res.send("문서들을 보관하고 보여주는 곳입니다");
});

app.get("/etc", (req, res) => {
  res.send("등등 내용입니다");
});

app.listen(port, () => {
  console.log(`서버 시작. PortNumber ${port}`);
});
