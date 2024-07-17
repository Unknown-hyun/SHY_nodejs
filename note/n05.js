const http = require("http"); // http 모듈 사용
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/plain; charset=utf-8");
  const jsonData = require("../jsondata.json");
  console.log(1, JSON.stringify(jsonData));
  req.end(JSON.stringify(jsonData, null, 2));
});

server.listen(port, () => {
  // server.listen(3000, function(){
  console.log(`${port}포트에서 서버가 가동됨`);
  // ES6 신 문법 백틱(') 사용 : 템플릿 문자열, 템플릿 리터럴
});
