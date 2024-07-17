const e = require("express");
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
    console.log("접속실패");
    return;
  }
  console.log("MySQL Connected");
  console.log("localhost:3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  console.log("웹에 정상 접속하였습니다");
});

app.get("/list", (req, res) => {
  db.query("SELECT * FROM web2", (err, results) => {
    const data = results;
    console.log(data);

    let list = `    <!DOCTYPE html>`;
    list += `<html lang="ko">`;
    list += `  <head>`;
    list += `    <meta charset="UTF-8" />`;
    list += `    <meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
    list += `    <title>리스트</title>`;
    list += `    <style>`;
    list += `      table {`;
    list += `        border-collapse: collapse;`;
    list += `        text-align: center;`;
    list += `        width: 80%;`;
    list += `        margin: auto;`;
    list += `      }`;
    list += ``;
    list += `      th,`;
    list += `      tr,`;
    list += `      td {`;
    list += `        border: 1px solid #ccc;`;
    list += `      }`;
    list += ``;
    list += `      td {`;
    list += `        width: 20%;`;
    list += `      }`;
    list += ``;
    list += `      h2 {`;
    list += `        text-align: center;`;
    list += `      }`;
    list += ``;
    list += `      th {`;
    list += `        background-color: lightblue;`;
    list += `      }`;
    list += `    </style>`;
    list += `  </head>`;
    list += ``;
    list += `  <body>`;
    list += `    <h2>Database List</h2>`;
    list += `    <table>`;
    list += `      <tr>`;
    list += `        <th>No.</th>`;
    list += `        <th>ID</th>`;
    list += `        <th>Password</th>`;
    list += `        <th>Name</th>`;
    list += `        <th>E-Mail</th>`;
    list += `      </tr>`;
    data.forEach((v) => {
      list += `      <tr>`;
      list += `        <td>${v.Number}</td>`;
      list += `        <td>${v.ID}</td>`;
      list += `        <td>${v.Password}</td>`;
      list += `        <td>${v.Name}</td>`;
      list += `        <td>${v.email}</td>`;
      list += `      </tr>`;
    });
    list += `<button type="button" onclick="location.href='/'">Back</button>`;
    list += `    </table>`;
    list += `  </body>`;
    list += `</html>`;
    res.send(list);
  });
});

app.get("/data", (req, res) => {
  const { ID, Password, Name, email } = req.query;
  db.query(
    "INSERT INTO web2 (ID, Password, Name, email) VALUES (?, ?, ?, ?)",
    [ID, Password, Name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
      console.log(
        `ID : ${ID}, Password : ${Password}, Name : ${Name}, email : ${email}`
      );
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
