const Consumer = require("../models/consumer");

exports.getCategory = async (req, res, next) => {
  try {
    const categoryData = await Consumer.getCategoryProduct();
    if (!categoryData) {
      const error = new Error("Could not find category. ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Fetched category successfully ",
      data: categoryData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
