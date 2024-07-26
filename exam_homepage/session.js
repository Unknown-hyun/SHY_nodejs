const express = require("express");
const Session = require("express-session");
const bodyParser = require("body-parser"); // 모듈 import, Express v4.16.0 이상은 설치 생략 가능
const mysql = require("mysql");
const logger = require("morgan");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "lhs",
  port: 3306,
  password: "1234",
  database: "exam",
});

app.use(logger("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

db.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("connected to MySQL");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/join.html");
});

app.post("/data", (req, res) => {
  const { ID, PW, Name } = req.body;
  console.log(ID, PW, Name);
  console.log(req.body);
  db.query(
    "INSERT INTO user (ID, PW, Name) VALUES (?, ?, ?)",
    [ID, PW, Name],
    (error, result) => {
      //res.redirect("/");
      res.send(`<script>alert('회원가입 완료');location.href='/'</script>`);
      console.log("데이터 입력 성공");
    }
  );
});

app.get("/list", (req, res) => {
  const table = "user";
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
            <th>ID</th>
            <th>PW</th>
            <th>Name</th>
            </tr>`;
  db.query(que, (error, result) => {
    result.forEach((v) => {
      console.log(v);
      list += `
                <tr>
                <td>${v.No}</td>
                <td>${v.ID}</td>
                <td>${v.Name}</td>
                </tr>`;
    });

    list += `</table>
  </body>
</html>
`;
    res.send(list);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  Session({ secret: "pw123456", resave: false, saveUninitialized: true })
);

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/float.html");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.post("/login", (req, res) => {
  const { ID, PW } = req.body;
  console.log(typeof ID, ID, typeof PW, PW);

  // 정규표현식
  // const idOK = /^[A-Za-z0-9]{1,8}$/g.test(ID); // 방법1. true or false 반환, 속도 빠름
  // const pwOK = PW.match(/^[A-Za-z0-9]{1,10}$/g); // 방법2. 정규표현식에 일치한 값
  // console.log(idOK, pwOK, !!idOK, !!pwOK);

  db.query(
    "SELECT count(*) AS c FROM user WHERE ID = ? AND PW = ?",
    [ID, PW],
    (err, results) => {
      const data = results;
      console.log(data);
      console.log(results[0].c);

      if (results[0].c == 1) {
        if (ID == "admin") {
          res.sendFile(__dirname + "\\adminpage.html");
        } else {
          res.sendFile(__dirname + "\\board.html");
        }
      } else {
        res.send(`<script>
               alert("아이디와 비밀번호를 체크하세요");
               window.location.href='/'
               </script>`);
      }

      // if (idOK && !!pwOK) {
      //   if (ID == "admin" && PW == "1234") {
      //     req.session.loggedIn = true;
      //     req.session.ID = ID;
      //     res.sendFile(__dirname + "/admin.html");
      //   } else {
      //     res.sendFile(__dirname + "/float.html");
      //   }
      // } else {
      //   res.send(`<script>
      //     alert("아이디와 비밀번호를 체크하세요");
      //     window.location.href='/login'
      //     </script>`);
      // }
    }
  );
});

app.get("/logoutbtn", (req, res) => {
  req.session.destroy((e) => {
    if (e) console.error(e);
    res.send(
      `<script>alert('로그아웃 되었습니다');window.location.href='/'</script>`
    );
  });
});

app.listen(port, () => {
  console.log(`server is running on prot ${port}`);
  console.log(`Follow Link (Ctrl+Click) : http://localhost:${port}`);
});
