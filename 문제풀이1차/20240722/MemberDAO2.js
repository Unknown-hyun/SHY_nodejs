const express = require("express");
const Session = require("express-session");
const mysql = require("mysql");
const bodyParser = require("body-parser"); // 모듈 import, Express v4.16.0 이상은 설치 생략 가능

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "lhs",
  port: 3306,
  password: "1234",
  database: "test_db",
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  Session({ secret: "pw123456", resave: false, saveUninitialized: true })
);

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.send(`
      <style>
      div {
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
        h1 {
        color: green;
        }
      </style>
      <div>
      <h1>성공적으로 로그인 되었습니다</h1>
        <h2>안녕하세요! ${req.session.username}님!</h2>
        <button id="manage" onclick="location.href='/logout'">로그아웃</button>
        <button id="delete" onclick="location.href='/list'">회원정보보기</button>
        </div>
        `);
  } else {
    res.sendFile(__dirname + "/login2.html");
  }
});

app.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log(typeof username, username, typeof password, password); //test,1234
  // 정규표현식
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(username); // 방법1. true or false 반환, 속도 빠름
  const pwOK = password.match(/^[A-Za-z0-9]{1,10}$/g); // 방법2. 정규표현식에 일치한 값
  console.log(idOK, pwOK, !!idOK, !!pwOK);

  if (idOK && !!pwOK) {
    if (username == "admin" && password == "123456") {
      req.session.loggedIn = true;
      req.session.username = username;
      res.redirect("/");
    } else {
      //   res.send(`<h3>아이디와 비밀번호를 확인해주세요</h3>
      //     <button onclick="location.href='/login'">뒤로가기</button>
      //     `);
      res.send(
        `<script>alert("아이디와 비밀번호를 확인해주세요"); window.location.href='/login'</script>`
      );
    }
  } else {
    res.send(`<script>
        alert("입력조건에 맞지 않습니다");
        window.location.href='/login2'
        </script>`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    if (e) console.error(e);
    res.send(
      `<script>alert('로그아웃 되었습니다');window.location.href='/'</script>`
    );
  });
});

app.get("/list", (req, res) => {
  const table = "web2";
  const que = `SELECT * FROM ${table}`;
  let list = "";
  list += `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
  h1{
  text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    }
    tr,
    th,
    td {
        border: 1px solid black;
        text-align: center;
        }
        th {
            background-color: rgb(199, 181, 216);
            }
            </style>
            </head>
            <body>
            <h1>데이터베이스 내용</h1>
            <button type="button" onclick="location.href='/'">뒤로가기</button>
            <table>
            <tr>
            <th>No.</th>
            <th>아이디</th>
            <th>이름</th>
            <th>나이</th>
            <th>이메일</th>
            </tr>`;
  db.query(que, (error, result) => {
    result.forEach((v) => {
      console.log(v);
      list += `
                <tr>
                <td>${v.num}</td>
                <td>${v.id}</td>
        <td>${v.name}</td>
        <td>${v.age}</td>
        <td>${v.email}</td>
      </tr>`;
    });

    list += `</table>
  </body>
</html>
`;
    res.send(list);
  });
});

app.listen(port, () => {
  console.log(`server is running on prot ${port}`);
  console.log(`Follow Link (Ctrl+Click) : http://localhost:${port}`);
});
