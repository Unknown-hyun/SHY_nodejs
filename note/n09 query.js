const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;

app.use(logger("tiny"));

app.get("/", (req, res) => {
  res.send("반갑나요?");
});

app.get("/book", (req, res) => {
  //   let u_name = req.param("uname");
  //   let b_name = req.param("bname");
  let u_name = req.query.uname;
  let b_name = req.query.bname;
  let p_date = req.query.pdate;
  console.log(u_name, b_name, p_date);
  res.send(
    "<h2>저자 : " +
      u_name +
      "</h2><h2>도서명 : " +
      b_name +
      "</h2><h2>출판일 : " +
      p_date +
      "</h2>"
  );
});

app.listen(port, () => {
  console.log(`서버 시작. PortNumber ${port}`);
});
