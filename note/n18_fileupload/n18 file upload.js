const express = require("express");
const logger = require("morgan");
const path = require("path");
const multer = require("multer"); // 파일업로드 처리하는 미들웨어

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/");

app.use(logger("tiny"));

app.use("/", express.static(_path));

// post 형식으로 주고 받을 때
app.use(express.json()); // 데이터 해석하여 req.body에 저장
app.use(express.urlencoded({ extended: true })); // 확장개념 본문 파싱

// 파일을 주고 받을 때 무조건 필요함
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, _path); // 경로를 같은 폴더에 설정
  },
  filename: (req, res, cb) => {
    let fix = Buffer.from(res.originalname, "latin1").toString("utf-8"); // 파일명 한글 깨짐 방지
    cb(null, fix); // 오리지날 네임
  },
});

let upload = multer({ storage }); // multer의 옵션을 Object로 설정

app.post("/up", upload.single("ufile"), (req, res) => {
  console.log(req.file);
  res.send(`<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">파일 전송 완료</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>ㅇㅇ 파일이 정상 전송 되었습니다!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`);
});

app.listen(port, () => {
  console.log(`server is running on ${port} http://localhost:${port}`);
});
