const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;
app.use(logger("tiny"));

app.use("/", express.static(__dirname + "/html"));
app.get("/list", (req, res) => {
  fs.readdir(__dirname + "/html", "utf-8", (err, data) => {
    let box = "";
    for (let i = 0; i < data.length; i++) {
      box += "<a href=" + data[i] + ">" + data[i] + "</a></br>";
    }
    res.send(box);
  });
});

app.listen(port, () => {
  console.log(`${port} 포트에 연결됨`);
});
