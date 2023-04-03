const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // đọc các biến môi trường từ file .env

exports.signup = async (req, res, next) => {
  // Validation input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  try {
    const infoInput = req.body;
    // Lấy ra lastId của bảng Customer thêm 1. Tọa info của customer
    const idCustomer = await User.getLastIdCustomer();
    const { password, ...infoCustomer } = infoInput;
    infoCustomer.id = idCustomer;

    // Lấy ra lastId của bảng User thêm 1. Tọa info của User
    const idUser = await User.getLastIdCustomer();
    const date = new Date().toISOString().slice(0, 10);
    // Mã hóa mật khẩu
    const hashedPw = await bcrypt.hash(req.body.password, 12);
    const InfoUser = {
      id: idUser,
      phone: req.body.phone,
      role: 3,
      cDate: date,
      password: hashedPw,
    };

    // Thêm customer and user
    User.insertCustomer(infoCustomer)
      .then((result) => {
        return User.insertUser(InfoUser);
      })
      .then((result) => {
        res
          .status(201)
          .json({ message: "Sign up successfully ! ", userId: idUser });
      });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const phone = req.body.phone;
  const password = req.body.password;
  try {
    const user = await User.findPhoneUser(phone);
    console.log(user);
    if (!user) {
      const error = new Error("A user with this phone could not be found.");
      error.statusCode = 401;
      throw error;
    }
    // Mã hóa mật khẩu lưu trong csdl và kiểm tra với password
    const isEqual = await bcrypt.compare(password, user.Password);
    // nếu sai password
    if (!isEqual) {
      // throw error
      const error = new Error("Wrong password !");
      error.statusCode = 401;
      throw error;
    }
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        userName: user.SDT,
        user: {
          userId: user.ID_User,
          permission: user.Role,
        },
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token: token, userId: user.ID_User }); // Bắn API lên bao gồm token và userId
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
