const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee");

// Sử dụng middleware
const isAuth = require("../middleware/is-auth");
// const isPermission = require("../middleware/is-permission");

// GET;
router.get("/contract", employeeController.getListContract);
<<<<<<< HEAD
router.get(
  "/contractPendingApproval",
  employeeController.getListContractPendingApproval
);
=======
router.get("/contractPendingApproval", employeeController.getListContractPendingApproval);
>>>>>>> BE_Thai
router.get("/contract/:idContract", employeeController.getContract);

router.get("/partner", employeeController.getListPartner);
router.get("/partner/:idPartner", employeeController.getPartner);

router.get("/partnerProducts/:idPartner", employeeController.getPartnerProduct);

// PUT
router.put("/updateContract/:idContract", employeeController.updateContract);

//DELETE
router.delete("/deleteContract/:idContract", employeeController.deleteContract);
<<<<<<< HEAD

=======
>>>>>>> BE_Thai
module.exports = router;
