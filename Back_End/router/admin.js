const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

// Sử dụng middleware
const isAuth = require("../middleware/is-auth");
const isPermission = require("../middleware/is-permission");

router.get(
  "/products",
  isAuth,
  isPermission.isAdmin,
  adminController.getProducts
);

module.exports = router;
