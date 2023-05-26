const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();
// upload,download file
const multer = require("multer");

// Router
const adminRoute = require("./router/admin");
const authRoute = require("./router/auth");
const consumerRoute = require("./router/consumer");
const employeeRoute = require("./router/employee");

const app = express();
const port = process.env.PORT || 5001;

// upload, download file
const { v4: uuidv4 } = require("uuid");
const { nextTick } = require("process");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // thêm đuôi file vào
    const extension = path.extname(file.originalname);
    cb(null, uuidv4() + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json()); // application/json
app.use(express.urlencoded({ extended: true }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("images", 10)
);
app.use("/images", express.static(path.join(__dirname, "images"))); // Để lấy tớI mục images

// Cho phép truy cập vào API từ bất kì Clients nào CORS Error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/v1/api/admin", adminRoute);
app.use("/v1/api/auth", authRoute);
app.use("/v1/api/consumer", consumerRoute);
app.use("/v1/api/employee", employeeRoute);

// Lên lịch xuất file điểm từ csdl hệ thống gửi cho đối tác vào 23:55 mỗi ngày
cron.schedule("55 23 * * *", async () => {
  try {
    const response = await axios.get(
      "https://project-ec-tuankhanh.onrender.com/v1/api/admin/exportFile"
    );
    // Xử lý kết quả từ server
    console.log(response.data);
  } catch (error) {
    console.error("Error calling API to exportFile :", error.message);
  }
});

// Lên lịch đồng bộ điểm từ file json đối tác gửi tới vào 00:00 mỗi ngày
cron.schedule("0 0 * * *", async () => {
  try {
    const response = await axios.get(
      "https://project-ec-tuankhanh.onrender.com/v1/api/admin/synchronizingPoints"
    );
    // Xử lý kết quả từ server
    console.log(response.data);
  } catch (error) {
    console.error("Error calling API to synchronizingPoints : ", error.message);
  }
});

// Xử lý lỗi
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => console.log(`sever is running at port ${port}`));
