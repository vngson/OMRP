const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Partner = require("../models/partner");
const Employee = require("../models/employee");
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
    const idUser = await User.getLastIdUser();
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
    // console.log(user);
    if (!user) {
      const error = new Error("A user with this phone could not be found.");
      error.statusCode = 401;
      throw error;
    }
    if (user.Pass !== password) {
      // Mã hóa mật khẩu lưu trong csdl và kiểm tra với password
      const isEqual = await bcrypt.compare(password, user.Pass);
      // nếu sai password
      if (!isEqual) {
        // throw error
        const error = new Error("Wrong password !");
        error.statusCode = 401;
        throw error;
      }
    }

    // Lấy thông tin người dùng theo role
    let infoUser = {};
    let infoUserArr;
    switch (user.ROLE) {
      case "1":
        console.log("admin");
        break;
      case "2":
        console.log("Partner");
        infoUserArr = await Partner.getInfoPartner(user.Username);
        infoUser = infoUserArr[0];
        break;
      case "3":
        console.log("Customer");
        infoUserArr = await User.getPhoneCustomer(user.Username);
        infoUser = infoUserArr[0];
        break;
      case "4":
        console.log("Employee");
        infoUserArr = await Employee.getInfoEmployee(user.Username);
        infoUser = infoUserArr[0];
        break;
    }
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        userName: user.Username,
        user: {
          userId: user.ID_Login,
          permission: user.ROLE,
        },
        userInfo: infoUser,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token: token, userId: user.ID_Login }); // Bắn API lên bao gồm token và userId
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
