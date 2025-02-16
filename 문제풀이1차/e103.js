const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/e103.html");
});
app.get("/gugudan", (req, res) => {
  let list = ``;
  list += `    <!DOCTYPE html>`;
  list += `<html lang="ko">`;
  list += `<head>`;
  list += `    <meta charset="UTF-8">`;
  list += `    <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  list += `    <title>Document</title>`;
  list += `</head>`;
  list += `<style>`;
  list += `    table {`;
  list += `        width: 80%;height: 400px;`;
  list += `        border-collapse: collapse;`;
  list += `    text-align: center;}`;
  list += `    td {`;
  list += `        border: 1px solid #000;width:10%;`;
  list += `        }`;
  list += ` th{background-color: rgb(171, 140, 199); border: 1px solid #000;width:10%;}`;
  list += `</style>`;
  list += `<body><h1>구구단</h1>
            <form action="/gugudan">
                <select name="gugudan">
                    <option value="0">전체</option>`;
  for (let i = 2; i <= 9; i++) {
    list += `         <option value="${i}">${i}단</option>`;
  }
  list += ` </select><input type="submit" value="확인"></form>`;
  list += `<table><tr>`;

  const gugudan = req.query.gugudan;
  if (!gugudan || gugudan == 0) {
    list += `<th></th>`;
    for (let k = 2; k <= 9; k++) {
      list += `<th>${k}단</th>`;
    }
    list += `</tr>`;

    for (let j = 1; j <= 9; j++) {
      list += `<tr><th>${j}</th>`;
      for (let i = 2; i <= 9; i++) {
        list += `<td>${i} x ${j} = ${i * j}</td>`;
      }
      list += `</tr>`;
    }
  } else {
    list += `<th>${gugudan}단</th></tr>`;
    for (let i = 2; i <= 9; i++) {
      list += `<td>${gugudan} x ${i} = ${gugudan * i}</td></tr>`;
    }
  }

  list += `    </table>`;
  list += `</body>`;
  list += `</html>`;
  res.send(list);
});

app.listen(port, () => {
  console.log("server running on port " + port);
  console.log("Follow Link (Ctrl+Click) : http://localhost:" + `${port}`);
});
