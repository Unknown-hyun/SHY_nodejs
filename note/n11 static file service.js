const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;
app.use(logger("tiny"));

app.use("/", express.static(__dirname + "/html"));
app.use("/main", express.static(__dirname));

app.listen(port, (req, res) => {
  console.log(`${port} 포트에 연결되었습니다`);
});
