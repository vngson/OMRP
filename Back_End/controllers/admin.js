const Product = require("../models/product");

exports.getProducts = async function (req, res, next) {
  try {
    const info = await Product.getInfoProduct();

    res.status(201).json({
      message: "Fetched products successfully",
      products: info,
    });
    // console.log(info);
  } catch (error) {
    console.log(error);
  }
};
