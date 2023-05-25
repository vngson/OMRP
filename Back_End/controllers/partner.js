const Partner = require("../models/partner");
const Admin = require("../models/admin");
const Consumer = require("../models/consumer");

exports.getProducts = async (req, res, next) => {
    // Phân trang product
    const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
    const perPage = req.query.perPage || 4; // Lấy tham số query hoặc mặc định là 4
    const partnerId = req.params.partnerId;
    try {
      const count = await (type
        ? Partner.countProductType(partnerId, type)
        : Partner.countProduct(partnerId));
      //console.log(count.count);
      const skip = (currentPage - 1) * perPage;
      const limit = Number(perPage);
      const products = await (type
        ? Partner.getProductsType(skip, limit, partnerId, type)
        : Consumer.getProducts(skip, limit, partnerId));
      if (products.length === 0) {
        const error = new Error("Could not find products ! ");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Fetched products successfully ",
        products: products,
        totalItems: count.count,
        perPage: perPage,
        currentPage: currentPage,
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
    const partnerId = req.params.partnerId;

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
        const haveProduct = await Partner.getProduct(productId, partnerId);
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
        const haveProduct = await Partner.getProduct(productId, partnerId);
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
    const partnerId = req.params.partnerId;
    const productId = req.params.productId;
    

    try {
      const haveProduct = await Partner.getProduct(productId, partnerId);
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
  