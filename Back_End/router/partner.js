const express = require("express");
const router = express.Router();

const partnerController = require("../controllers/partner");

// Sử dụng middleware
const isAuth = require("../middleware/is-auth");
const isPermission = require("../middleware/is-permission");

//GET
router.get("/:partnerId/contract", partnerController.getContracts);

// POST
router.post("/:partnerId/registerContract", partnerController.registerContract);
router.post(
  "/:partnerId/postProduct/:productId",
  partnerController.postProduct
);

// DELETE;
router.delete(
  "/:partnerId/deleteProduct/:productId",
  partnerController.deleteProduct
);

module.exports = router;
