const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

// Sử dụng middleware
const isAuth = require("../middleware/is-auth");
const isPermission = require("../middleware/is-permission");

// GET;
router.get("/account", adminController.getAccounts);

// PUT;
router.put("/account/:id", adminController.updateStatus);

module.exports = router;
