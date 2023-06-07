const Admin = require("../models/admin");
const Consumer = require("../models/consumer");

const fs = require("fs");
const path = require("path");
const { dirname } = require("path");

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
  try {
    const haveAccount = await Admin.getAccount(idAccount);
    if (!haveAccount) {
      const error = new Error("Could not find account");
      error.statusCode = 404;
      throw error;
    }

    const updateStatus =
      haveAccount.Status === "locked"
        ? await Admin.updateAccountStatus(idAccount, "unlocked")
        : await Admin.updateAccountStatus(idAccount, "locked");
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
  const lastid = await Admin.getLastIDProduct();
  const urlType = await Admin.getURLTypeProduct(typeProduct);
  const id = Number(lastid.ID_PRODUCTS) + 1;

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
    const haveProduct = await Admin.getProduct(productId);
    if (!haveProduct) {
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
// Xử lý đồng bộ điểm, Xuất file từ điểm hệ thống
exports.exportFileSystem = async (req, res, next) => {
  try {
    const pointsArr = await Admin.getPoints();

    // Gôm các đối tượng có cùng ID, thêm mới thuộc tính customer
    const mergedPoints = pointsArr.reduce((newPoints, obj) => {
      const existingObj = newPoints.find((data) => data.id === obj.id);

      if (existingObj) {
        // Đối tượng đã tồn tại, thêm đối tượng con vào thuộc tính PRODUCTS
        existingObj.customer.push({
          username: obj.username,
          point: obj.point,
        });
      } else {
        // Đối tượng chưa tồn tại, tạo mới và thêm vào mảng
        newPoints.push({
          id: obj.id,
          name: obj.name,
          email: obj.email,
          address: obj.address,
          phone: obj.phone,
          customer: [
            {
              username: obj.username,
              point: obj.point,
            },
          ],
        });
      }

      return newPoints;
    }, []);

    const outputDir = path.join(__dirname, "..", "data", "point_system");

    mergedPoints.forEach((obj) => {
      const fileName = `${obj.name.replace(/\s/g, "")}_${obj.id.trim()}.json`;
      const filePath = path.join(outputDir, fileName);
      const jsonContent = JSON.stringify(obj, null, 2);

      fs.writeFile(filePath, jsonContent, "utf8", (err) => {
        if (err) {
          const error = new Error("Error writing JSON file");
          error.statusCode = 404;
          throw error;
        }
      });
    });

    res.status(200).json({
      message: "Export file points system successfully !",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Xử lý đồng bộ điểm, nhập điểm từ file đối tác gửi
exports.synchronizingPoints = async (req, res, next) => {
  try {
    // Xử lý đọc tất cả file trong data
    const dataDir = path.join(__dirname, "..", "data", "point_partner");
    const files = fs.readdirSync(dataDir); // Read the list of files synchronously

    let mergedData = []; // Array to store the merged data

    files.map((file) => {
      const filePath = path.join(dataDir, file);
      if (path.extname(file) === ".json") {
        // Read the contents of each JSON file
        const jsonData = fs.readFileSync(filePath, "utf-8");
        const parsedData = JSON.parse(jsonData);
        mergedData = mergedData.concat(parsedData); // Merge the data into the mergedData array
      }
    });

    await Promise.all(
      mergedData.map(async (partner) => {
        await Promise.all(
          partner.customer.map(async (data) => {
            const idConsumer = await Admin.getIdConsumer(data.username);
            if (!idConsumer) {
              const error = new Error("Could not find id Consumer");
              error.statusCode = 404;
              throw error;
            }
            const updatePoint = await Admin.updatePoints(
              partner.id,
              idConsumer.id,
              data.point
            );
          })
        );
      })
    );
    res.status(200).json({
      message: "Update points consumer successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
