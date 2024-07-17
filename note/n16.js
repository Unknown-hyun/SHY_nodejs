const express = require("express");
const path = require("path");
const fs = require("fs");
const logger = require("morgan");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/html");

app.use(logger("tiny"));
app.use("/", express.static(_path));

app.get("/data", (req, res) => {
  const title = req.query.title;
  const content = req.query.content;
  res.redirect("/");
  fs.writeFile(title + ".text", content, (e) => {
    if (e) console.log(e); // 에러시 에러 내용 출력
    console.log(title, content);
    console.log(`'${title}' 파일 생성`);
  });
});

app.listen(port, () => {
  console.log("server is runnig on port " + port);
});
