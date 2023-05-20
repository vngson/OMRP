const Admin = require("../models/admin");
const Consumer = require("../models/consumer");

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

    if (accountData.length === 0) {
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
    const haveAccount = await Admin.getAccount(idAccount);
    if (haveAccount.length === 0) {
      const error = new Error("Could not find account");
      error.statusCode = 404;
      throw error;
    }
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

  // Đến cuối sẽ thay link onrender vào đây , tạm thời để trên local để làm. Mảng ảnh sản phẩm
  const imageUrls = req.files.map(
    (file) => `http://localhost:4132/images/${file.filename}`
  );
  const nameProduct = req.body.name;
  const typeProduct = req.body.type;
  const desc = req.body.desc;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const date = new Date().toISOString().slice(0, 10);
  const id = await Admin.getLastIDProduct();
  const urlType = await Admin.getURLTypeProduct(typeProduct);

  const newProduct = {
    id: id,
    nameProduct: nameProduct,
    typeProduct: typeProduct,
    desc: desc,
    quantity: quantity,
    price: price,
    date: date,
    imageUrls: imageUrls,
    typeUrl: urlType.Img,
  };
  try {
    const postProduct = await Admin.insertNewProduct(newProduct);

    res.status(200).json({
      message: "Post new product successfully",
      newProduct: newProduct,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.productId;

  const nameProduct = req.body.name;
  const typeProduct = req.body.type;
  const desc = req.body.desc;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const urlType = await Admin.getURLTypeProduct(typeProduct);

  const updateProduct = {
    id: productId,
    nameProduct: nameProduct,
    typeProduct: typeProduct,
    desc: desc,
    quantity: quantity,
    price: price,
    typeUrl: urlType.Img,
  };
  // kiểm tra file có được update không
  if (!req.files || req.files.length === 0) {
    try {
      const haveProduct = await Consumer.getProduct(productId);
      if (haveProduct.length === 0) {
        const error = new Error("Could not find product");
        error.statusCode = 404;
        throw error;
      }
      const putProduct = await Admin.updateProductNoFile(updateProduct);
      res.status(200).json({
        message: "Update product successfully",
      });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  } else {
    // Đến cuối sẽ thay link onrender vào đây , tạm thời để trên local để làm. Mảng ảnh sản phẩm
    const imageUrls = req.files.map(
      (file) => `http://localhost:4132/images/${file.filename}`
    );
    updateProduct.imageUrls = imageUrls;
    try {
      const haveProduct = await Consumer.getProduct(productId);
      if (haveProduct.length === 0) {
        const error = new Error("Could not find product");
        error.statusCode = 404;
        throw error;
      }
      const putProduct = await Admin.updateProduct(updateProduct);
      res.status(200).json({
        message: "Update product successfully",
      });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const haveProduct = await Consumer.getProduct(productId);
    if (haveProduct.length === 0) {
      const error = new Error("Could not find product");
      error.statusCode = 404;
      throw error;
    }
    const deleteProduct = await Admin.deleteProduct(productId);
    res.status(200).json({
      message: "Delete product successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
