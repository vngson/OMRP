const Consumer = require("../models/consumer");

exports.getCategory = async (req, res, next) => {
  try {
    const categoryData = await Consumer.getCategoryProduct();
    if (categoryData.length === 0) {
      const error = new Error("Could not find category ! ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Fetched category successfully ! ",
      data: categoryData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  // Phân trang product
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 4; // Lấy tham số query hoặc mặc định là 4
  const type = req.query.type || null; // Lấy tham số query hoặc mặc định không có

  try {
    const count = await (type
      ? Consumer.countProductType(type)
      : Consumer.countProduct());

    const skip = (currentPage - 1) * perPage;
    const limit = Number(perPage);
    const products = await (type
      ? Consumer.getProductsType(skip, limit, type)
      : Consumer.getProducts(skip, limit));

    if (products.length === 0) {
      const error = new Error("Could not find products ! ");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Fetched products successfully ! ",
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

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Consumer.getProduct(productId);

    if (product.length === 0) {
      const error = new Error("Could not find product ! ");
      error.statusCode = 404;
      throw error;
    }

    const Urls = product.reduce((result, obj, index) => {
      result.push({
        id: index,
        img: obj.URL,
      });
      return result;
    }, []);

    const curProduct = product[0];

    const { URL, ...productObj } = curProduct;

    productObj.URL = Urls;

    res.status(200).json({ message: "Product fetched !", product: productObj });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
