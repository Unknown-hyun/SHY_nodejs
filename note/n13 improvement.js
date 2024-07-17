const express = require("express");
const path = require("path"); // 경로 모듈

const app = express();
const port = 3000;
const _path = path.join(__dirname, "dist");

app.use(express.static(_path)); // 정적 파일 경로 설정

app.get("/", (req, res) => {
  res.send(`홈페이지 입니다 <a href="/story"><h3>목록 이동</h3></a>`);
});

app.get("/story", (req, res) => {
  const arr = [
    "My life is pretty",
    "Egg is Life",
    "Cute & I do not have cat",
    "Avergers are dead",
  ];

  const title = ["Pretty", "Egg", "Cat", "Avergers"];

  let list = `<h1>링크를 선택하세요</h1><ul>`;
  title.forEach((v, i) => {
    list += `<li><a href="/story?id=${i}">${v}</a></li>`;
  });
  list += `</ul><h2>${arr[req.query.id] || "선택하세요"}</h2>`;

  res.send(list);
});

app.listen(port, () => {
  console.log(port + " 포트에서 서버가 동작하였습니다.");
});
