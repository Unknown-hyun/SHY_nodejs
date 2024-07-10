const http = require("http"); // http 모듈 사용
const port = 3030;

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/plain; charset=utf-8");
  const obj = { Name: "홍길동", Age: 23 };
  console.log(1, obj);
  console.log(2, JSON.stringify(obj));
  res.end(JSON.stringify(obj)); // Object를 JSON 형태로 변환
});

server.listen(port, () => {
  // server.listen(3000, function(){
  console.log(`${port}포트에서 서버가 가동됨 ${port - 30} 포트가 아님`);
  // ES6 신 문법 백틱(') 사용 : 템플릿 문자열, 템플릿 리터럴
});
