const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const { download } = require("express/lib/response");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(
    "<h1>Funkin SHIT!</h1><br><h3><a href='/list'>Move to List</a></h3>"
  );
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

app.listen(port, (req, res) => {
  console.log(port + " 서버");
});
