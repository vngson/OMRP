const express = require("express");
const router = express.Router();

const consumerController = require("../controllers/consumer");

// Sử dụng middleware
const isAuth = require("../middleware/is-auth");
// const isPermission = require("../middleware/is-permission");

// GET;
router.get("/category", consumerController.getCategory);

router.get("/product", consumerController.getProducts);
router.get("/product/:productId", consumerController.getProduct);

router.get("/productPoint/:consumerId", consumerController.getProductsPoints);

router.get(
  "/productExchangePoint/:consumerId",
  consumerController.getProductsExchangePoint
);

module.exports = router;
