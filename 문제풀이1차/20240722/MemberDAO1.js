const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "lhs",
  port: 3306,
  password: "1234",
  database: "test_db",
});

db.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("connected to MySQL");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/memberForm.html");
});

app.get("/data", (req, res) => {
  const { id, name, age, email } = req.query;
  db.query(
    "INSERT INTO web2 (id, name, age, email) vALUES (?, ?, ?, ?)",
    [id, name, age * 1, email],
    (error, result) => {
      //res.redirect("/");
      res.send(`<script>alert('데이터 입력 성공');location.href='/'</script>`);
      console.log("데이터 입력 성공");
    }
  );
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
  console.log(`server is running on prot ${port} http://localhost:${port}`);
});
