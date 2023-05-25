const express = require("express");
const router = express.Router();

const partnerController = require("../controllers/partner");

// Sử dụng middleware
const isAuth = require("../middleware/is-auth");
const isPermission = require("../middleware/is-permission");

// GET;
router.get("/:partnerId/product", partnerController.getProducts);
router.get("/:partnerId/product/:productId", partnerController.getProduct);

//PUT
router.put("/:partnerId/updateProduct/:productId", partnerController.updateProduct);

// DELETE;
router.delete("/:partnerId/product/:productId", adminController.deleteProduct);

module.exports = router;