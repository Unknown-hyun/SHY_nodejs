const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/list", (req, res) => {
  fs.readdir(__dirname, "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.send("Funkin T");
});

app.listen(port, (req, res) => {
  console.log(port + " 서버");
}); //!ㄴㅁㅇㄹ
