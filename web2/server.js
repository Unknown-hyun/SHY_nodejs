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
