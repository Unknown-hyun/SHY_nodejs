const express = require("express");
const Session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/e101.html");
});

app.post("/", (req, res) => {
  const { id, pw } = req.body;
  const idOK = /^[A-Za-z]{1,8}$/g.test(id);
  const pwOK = pw.match(/^[A-Za-z][0-9]{1,10}$/g);
  console.log(idOK, pwOK, !!pwOK);
  if (id === "admin" && pw === "123456") {
    res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>관리자로 로그인 하였습니다</h1>
      <a href="#"><button type="button">회원관리</button></a>
      <a href="#"><button type="button">회원삭제</button></a>
    </div>
  </body>
</html>
`);
    return;
  }

  if (idOK && !!pwOK) {
    res.send("로그인 되었습니다");
  } else {
    res.send("형식에 맞지 않습니다");
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port} http://localhost:3000`);
});
