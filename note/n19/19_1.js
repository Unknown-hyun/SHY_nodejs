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
  destination: (req, res, cb) => {
    cb(null, path.join(_path, "list"));
  },
  filename: (req, res, cb) => {
    let fix = Buffer.from(res.originalname, "latin1").toString("utf-8");
    cb(null, fix); // 파일명 그대로 저장
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
    <!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>파일 업로드 및 다운로드</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    />
    <style>
      body {
        background-color: #f8f9fa;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-top: 50px;
      }
      .modal-body {
        text-align: center;
      }
      .file-list {
        list-style-type: none;
        padding: 0;
      }
      .file-list li {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 4px;
      }
      .file-list li:nth-child(even) {
        background-color: #d2b5b5a7; /* 짝수 번째 요소 배경색 */
      }
      .file-list li a {
        text-decoration: none;
        color: #0d6efd;
        font-weight: 500;
        margin-left: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- 업로드 성공 모달 -->
      <div
        class="modal fade"
        id="uploadModal"
        tabindex="-1"
        aria-labelledby="uploadModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="uploadModalLabel">
                파일 전송 완료
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>파일이 정상적으로 전송되었습니다!</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 파일 업로드 폼 -->
      <form
        action="/upload"
        method="POST"
        enctype="multipart/form-data"
        class="mb-3"
        id="uploadForm"
      >
        <div class="input-group">
          <input
            type="file"
            class="form-control"
            id="inputGroupFile02"
            name="ufile"
          />
          <button
            class="btn btn-outline-primary"
            type="submit" <!-- 수정: type을 submit으로 변경 -->
            id="uploadButton"
          >
            Upload
          </button>
        </div>
      </form>

      <!-- 파일 목록 -->
      <h5>File List</h5>
      <ul id="fileList" class="file-list"></ul>
    </div>

    <!-- Bootstrap 및 JavaScript 라이브러리 로드 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      // 파일 목록을 가져와서 HTML에 추가하는 함수
      async function fetchFileList() {
        try {
          const response = await axios.get("/list");
          const fileList = response.data;

          const fileListElement = document.getElementById("fileList");
          fileListElement.innerHTML = ""; // 파일 목록 초기화

          fileList.forEach((file, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = decodeURIComponent(file); // 파일명 디코딩

            const downloadLink = document.createElement("a");
            downloadLink.href = \`/download/\${encodeURIComponent(file)}\`; // 파일명 encodeURIComponent 처리
            downloadLink.textContent = "다운로드";
            downloadLink.setAttribute("download", "");

            listItem.appendChild(downloadLink);
            fileListElement.appendChild(listItem);

            // 짝수 번째 요소에 배경색 클래스 추가
            if (index % 2 === 1) {
              listItem.classList.add("bg-white");
            }
          });
        } catch (error) {
          console.error("파일 목록을 가져오는 중 오류 발생:", error);
        }
      }

      // 페이지 로드 시 파일 목록 불러오기
      fetchFileList();

      // 파일 업로드 버튼 클릭 이벤트 처리
      document
        .getElementById("uploadForm")
        .addEventListener("submit", async (event) => { // 수정: submit 이벤트로 변경
          event.preventDefault(); // 기본 동작 방지

          try {
            const formData = new FormData(event.target);

            const response = await axios.post("/upload", formData);

            if (response.status === 200) {
              // 파일 업로드 성공 시 모달 띄우기
              const myModal = new bootstrap.Modal(
                document.getElementById("uploadModal")
              );
              myModal.show();

              // 파일 업로드 후 파일 목록 업데이트
              fetchFileList();
            } else {
              console.error("파일 업로드 실패");
            }
          } catch (error) {
            console.error("파일 업로드 중 오류 발생:", error);
          }
        });

      // 모달 닫힌 후 리다이렉션 처리
      const uploadModal = document.getElementById("uploadModal");
      uploadModal.addEventListener("hidden.bs.modal", function () {
        // 모달이 닫힐 때 페이지 리로드 없이 파일 목록만 다시 불러오기
        fetchFileList();
      });
    </script>
  </body>
</html>
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
