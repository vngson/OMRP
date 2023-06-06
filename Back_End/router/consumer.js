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

router.get(
  "/exchangePoint/:productId",
  consumerController.getExchangePointByProductId
);

router.get(
  "/partnersConsumer/:consumerId",
  consumerController.getPartnersConsumer
);

router.get("/getCart/:consumerId", consumerController.getCart);

router.get("/getHistory/:consumerId", consumerController.getHistoryConsumer);

router.get("/infoConsumer/:consumerId", consumerController.getInfoConsumer);

//POST;
router.post("/order/:consumerId", consumerController.orderProducts);

// PUT;
router.put("/updateInfo/:consumerId", consumerController.updateInfoConsumer);
router.put("/addToCart/:consumerId", consumerController.postCart);

router.put("/updateCart/:consumerId", consumerController.updateCart);

// DELETE
router.delete("/deleteCart/:consumerId", consumerController.deleteCart);

module.exports = router;
