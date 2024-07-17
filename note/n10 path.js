const express = require("express");
const logger = require("morgan");
const Session = require("express-session");
const app = express();
const port = 3000;

app.use(logger("tiny"));

app.get("/", (req, res) => {
  res.send("반갑나요?");
});

app.get("/book/:uname/:bname/:pdate", (req, res) => {
  console.log(req.params);
  console.log(req.session);
  console.log(req.params.uname);
  res.send(
    "<h2>저자 : " +
      req.params.uname +
      "</h2><h2>도서명 : " +
      req.params.bname +
      "</h2><h2>출판일 : " +
      req.params.pdate +
      "</h2>"
  );
});

app.listen(port, () => {
  console.log(`서버 시작. PortNumber ${port}`);
});
