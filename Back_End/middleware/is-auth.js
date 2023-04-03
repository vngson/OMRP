const jwt = require("jsonwebtoken");
require("dotenv").config(); // đọc các biến môi trường từ file .env

module.exports = (req, res, next) => {
  // Lấy headers client get lên
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1]; // Lấy token từ yêu cầu từ client gửi tới thông qua headers
  const secretKey = process.env.SECRET_KEY; // KEY secret
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secretKey); // JWT đối xứng với token đã gửi cho client và lấy ra thông tin data của user, bao gồm đã gửi cái gì lên, email, userId...
  } catch (error) {
    error.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.user = decodedToken.user; // Đưa user vào req
  next();
};
