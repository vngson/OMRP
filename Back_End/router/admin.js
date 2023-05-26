const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

// Sử dụng middleware
const isAuth = require("../middleware/is-auth");
const isPermission = require("../middleware/is-permission");

// GET;
router.get("/account", adminController.getAccounts);

router.get("/synchronizingPoints", adminController.synchronizingPoints);

// POST;
router.post("/postProduct", adminController.postProduct);

// PUT;
router.put("/account/:id", adminController.updateStatus);
router.put("/postProduct/:productId", adminController.updateProduct);

// DELETE;
router.delete("/product/:productId", adminController.deleteProduct);

module.exports = router;
