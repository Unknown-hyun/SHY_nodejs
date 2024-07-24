const express = require("express");
const Session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/", (req, res) => {
  const { username, password } = req.body;
  const idOK = /^[A-Za-z]{1,7}$/g.test(username);
  const pwOK = password.match(/^[A-Za-z0-9]{1,9}$/g);
  console.log(idOK, pwOK, !!pwOK);
  if (username === "admin" && password === "123456") {
    res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      fieldset {
      width: 50%;
      text-align: center;
      }
      body {
      text-align: center;
      }
      #manage {
      padding: 10px;
      margin: 10px 0;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      font-size: 16px;
      cursor: pointer;
      }
      #delete {
      padding: 10px;
      margin: 10px 0;
      border: none;
      border-radius: 4px;
      background-color: #b17013;
      color: white;
      font-size: 16px;
      cursor: pointer;
      }
  
    </style>
  </head>
  <body>
    <fieldset>
      <h1>관리자로 로그인 하였습니다</h1>
      <a href="#"><button type="button" id="manage">회원관리</button></a>
      <a href="#"><button type="button" id="delete">회원삭제</button></a>
    </fieldset>
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
