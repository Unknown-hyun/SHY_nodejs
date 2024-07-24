const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/");

app.use(express.static(_path));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(_path, "list"));
  },
  filename: (req, file, cb) => {
    let originalname = file.originalname;
    let fix = Buffer.from(originalname, "latin1").toString("utf-8");

    cb(null, fix);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("ufile"), (req, res) => {
  res.send(`
    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">파일 전송 완료</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>파일이 정상적으로 전송되었습니다!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.href='/'">Close</button>
          </div>
        </div>
      </div>
    </div>
  `);
});

app.get("/list", (req, res) => {
  const listDir = path.join(_path, "list");
  fs.readdir(listDir, { encoding: "utf-8" }, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("디렉토리 읽기 오류");
      return;
    }

    res.json(files);
  });
});

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(_path, "list", filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("파일을 찾을 수 없습니다");
    }
  });
});

app.listen(port, () => {
  console.log(
    `server is running on port ${port}  << http://localhost:${port} >>`
  );
});
