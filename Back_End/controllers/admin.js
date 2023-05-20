const Admin = require("../models/admin");

exports.getAccounts = async (req, res, next) => {
  const type = req.query.type;
  let accountData;
  try {
    switch (type) {
      case "KH":
        accountData = await Admin.getAccountConsumer();
        break;
      case "DT":
        accountData = await Admin.getAccountPartner();
        break;
      case "NV":
        accountData = await Admin.getAccountEmployee();
        break;
      default:
        const error = new Error("Could not find accountData. ");
        error.statusCode = 404;
        throw error;
    }

    if (!accountData) {
      const error = new Error("Could not find accountData. ");
      error.statusCode = 404;
      throw error;
    }
    accountData.map((data) => {
      if (data.Permission === "3") {
        data.Permission = "Khách hàng";
      }
      if (data.Permission === "2") {
        data.Permission = "Doanh Nghiệp";
      }
      if (data.Permission === "4") {
        data.Permission = "Nhân Viên";
      }
    });
    res.status(200).json({
      message: "Fetched accountData successfully ",
      data: accountData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  const idAccount = req.params.id;
  const status = req.body.status;

  try {
    const updateStatus = await Admin.updateAccountStatus(idAccount, status);

    res.status(200).json({ message: "Updated status successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postProduct = async (req, res, next) => {
  // kiểm tra file
  if (!req.files || req.files.length === 0) {
    const error = new Error("No files uploaded !");
    error.statusCode = 422;
    throw error;
  }

  const imageUrls = req.files.map(
    (file) =>
      `https://project-ec-tuankhanh.onrender.com/images/${file.filename}`
  );
  console.log(imageUrls);

  console.log("du lieu ne", req.body);
};
