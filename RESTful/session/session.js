const express = require("express");
const Session = require("express-session");
const bodyParser = require("body-parser"); // 모듈 import, Express v4.16.0 이상은 설치 생략 가능

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  Session({ secret: "pw123456", resave: false, saveUninitialized: true })
);

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.send(`<h2>${req.session.username}, 안녕하세요</h2>
        <h2>${req.session.username}의 개인공간입니다</h2>
        <hr/>
        <h2>대충 개인 데이터베이스 목록</h2>
        <button onclick="location.href='/logout'">로그아웃</button>
        `);
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(typeof username, username, typeof password, password); //test,1234
  // 정규표현식
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(username); // 방법1. true or false 반환, 속도 빠름
  const pwOK = password.match(/^[A-Za-z0-9]{1,8}$/g); // 방법2. 정규표현식에 일치한 값
  console.log(idOK, pwOK, !!idOK, !!pwOK);

  if (idOK && !!pwOK) {
    if (username == "test" && password == "1234") {
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
        window.location.href='/login'
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

app.listen(port, () => {
  console.log(`server is running on prot ${port}`);
  console.log(`Follow Link (Ctrl+Click) : http://localhost:${port}`);
});
