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
    console.log(`${title} is created`);
  });
});

app.use("/list", express.static("/data/workspace_nodejs"));
app.get("/list", (req, res) => {
  fs.readdir("/data/workspace_nodejs", "utf-8", (err, data) => {
    let box = "<h1>File List</h1>";
    for (let i = 0; i < data.length; i++) {
      box +=
        "<h4>" +
        (i + 1) +
        ". " +
        '<a href="' +
        data[i] +
        '">' +
        data[i] +
        '</a> <a href="' +
        data[i] +
        '" download>DOWNLOAD</a></h4>';
    }
    res.send(box);
  });
});

app.listen(port, () => {
  console.log("server is runnig on port " + port);
});
