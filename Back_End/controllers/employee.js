const Employee = require("../models/employee");

exports.getListContract = async (req, res, next) => {
  // Phân trang contract
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 4; // Lấy tham số query hoặc mặc định là 4
  try {
    const count = await Employee.getCountContract();
    const skip = (currentPage - 1) * perPage;
    const limit = Number(perPage);
    const contracts = await Employee.getListContract(skip, limit);
    if (contracts.length === 0) {
      const error = new Error("Could not find contracts ! ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Fetched contracts successfully ",
      contracts: contracts,
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

exports.getContract = async (req, res, next) => {
  const idContract = req.params.idContract;

  try {
    const contract = await Employee.getContract(idContract);

    if (contract.length === 0) {
      const error = new Error("Could not find product ! ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Contract fetched !", contract: contract });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getListPartner = async (req, res, next) => {
  // Phân trang Partner
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 4; // Lấy tham số query hoặc mặc định là 4
  try {
    const count = await Employee.getCountPartner();
    const skip = (currentPage - 1) * perPage;
    const limit = Number(perPage);
    const partners = await Employee.getListPartner(skip, limit);
    if (partners.length === 0) {
      const error = new Error("Could not find contracts ! ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Fetched partners successfully ",
      partners: partners,
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

exports.getPartner = async (req, res, next) => {
  const idPartner = req.params.idPartner;

  try {
    const partner = await Employee.getPartner(idPartner);

    if (partner.length === 0) {
      const error = new Error("Could not find partner ! ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Partner fetched !", partner: partner });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPartnerProduct = async (req, res, next) => {
  const idPartner = req.params.idPartner;

  try {
    const partnerProduct = await Employee.getListPartnerProduct(idPartner);

    if (partnerProduct.length === 0) {
      const error = new Error("Could not find product of partner ! ");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({
        message: "Product of partner fetched !",
        producs: partnerProduct,
      });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
