const Partner = require("../models/partner");
const Admin = require("../models/admin");
const Employee = require("../models/employee");
const Consumer = require("../models/consumer");
const moment = require('moment');
exports.registerContract = async (req, res, next) => {
  const partnerId = req.params.partnerId;

  const tax = req.body.tax;
  const deputy = req.body.deputy;
  const effectiveTime = Number(req.body.effectiveTime);
  const date = new Date().toISOString().slice(0, 10);
  const curDate = moment();
  const expirationDate = curDate.add(effectiveTime, 'years').format('YYYY-MM-DD');
  const amountToPoints = req.body.amountToPoints;
  const commission = req.body.commission;
  const id = await Partner.getLastIDContract();

  const newConstract = {
    id: id,
    tax: tax,
    deputy: deputy,
    date: date,
    effectiveTime: expirationDate,
    amountToPoints: amountToPoints,
    commission: commission,
    contractPartner: partnerId
  };
  try {
    const contracts = await Partner.getContracts(partnerId);
    if (contracts.length !== 0) {
      const error = new Error("Contract has exsited ! ");
      error.statusCode = 400;
      throw error;
    }
    const postContract = await Partner.insertNewContract(newConstract);
    res.status(200).json({
      message: "Register new contract successfully",
      newConstract: newConstract,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getContracts = async (req, res, next) => {
  const partnerId = req.params.partnerId;
  try {
    const contracts = await Partner.getContracts(partnerId);
    if (contracts.length === 0) {
      const error = new Error("Could not find contracts ! ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Fetched Contracts successfully ",
      contracts: contracts,
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
  const id_partners = req.params.partnerId;
  try {
    const haveContract = await Partner.getContractsIsValid(id_partners);
    if (!haveContract) {
      const error = new Error("Could not find contracts !");
      error.statusCode = 404;
      throw error;
    }
    const skip = (currentPage - 1) * perPage;
    const limit = Number(perPage);
    const count = await Consumer.countProduct();
    const products = await Consumer.getProducts(skip, limit);

    if (products.length === 0) {
      const error = new Error("Could not find products ! ");
      error.statusCode = 404;
      throw error;
    }
    const amountToPoints = await Partner.getAmountToPoint(id_partners)
    const partnerProducts = products.map((product) => {
      return {
        ...product,
        PRICE: Math.round(product.PRICE / amountToPoints)
      }
    })
    res.status(200).json({
      message: "Fetched products successfully ! ",
      products: partnerProducts,
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

exports.postProduct = async (req, res, next) => {
  const id_products = req.params.productId;
  const id_partners = req.params.partnerId;
  const price = req.body.price;
  const newProduct = {
    id_products: id_products,
    id_partners: id_partners,
    price: price
  };
  try {
    const haveContract = await Partner.getContractsIsValid(id_partners);
    if (!haveContract) {
      const error = new Error("Could not find contracts !");
      error.statusCode = 404;
      throw error;
    }

    const haveProduct = await Partner.getPartnerProduct(id_products, id_partners);
    if (haveProduct) {
      const error = new Error("Product has exists");
      error.statusCode = 400;
      throw error;
    }

    const postProduct = await Partner.insertNewProductCanExchange(newProduct);
    res.status(200).json({
      message: "Post new product successfully",
      postProduct: postProduct
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const id_products = req.params.productId;
  const id_partners = req.params.partnerId;

  try {
    const haveContract = await Partner.getContractsIsValid(id_partners);
    if (!haveContract) {
      const error = new Error("Could not find contracts !");
      error.statusCode = 404;
      throw error;
    }

    const haveProduct = await Partner.getPartnerProduct(id_products, id_partners);
    if (!haveProduct) {
      const error = new Error("Could not find product");
      error.statusCode = 404;
      throw error;
    }
    const deleteProduct = await Partner.deleteProduct(id_products, id_partners);
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
