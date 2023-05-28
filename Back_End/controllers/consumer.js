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

    productObj.partners = await Consumer.getPartnersProduct(productId);
    res.status(200).json({ message: "Product fetched !", product: productObj });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.searchProducts = async (req, res, next) => {
  // Phân trang product
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 4; // Lấy tham số query hoặc mặc định là 4
  const keyword = req.params.keyword; 

  try {
    const count = await Consumer.countProductSearched(keyword);
    const skip = (currentPage - 1) * perPage;
    const limit = Number(perPage);
    const products = await Consumer.searchProducts(skip, limit, keyword);

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

exports.getProductsPoints = async (req, res, next) => {
  const consumerId = req.params.consumerId;
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 10; // Lấy tham số query hoặc mặc định là 10

  // Chuyển đổi sang kiểu số nguyên
  const pageNumber = parseInt(currentPage);
  const itemsPerPage = parseInt(perPage);

  try {
    const pointConsumer = await Consumer.getPoints(consumerId);
    if (pointConsumer.length === 0) {
      const error = new Error("Could not find consumerID ! ");
      error.statusCode = 404;
      throw error;
    }

    const tampArr = [];
    await Promise.all(
      pointConsumer.map(async (data) => {
        const tamp = await Consumer.getProductsPoint(data.ID_Partners);
        tampArr.push(tamp);
      })
    );
    const dataTamp = tampArr.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);

    const data = dataTamp.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.ID_PRODUCTS === obj.ID_PRODUCTS)
    );

    // Tính chỉ số bắt đầu và kết thúc của mảng dựa trên trang và số lượng mục trên mỗi trang
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Cắt mảng theo chỉ số bắt đầu và kết thúc
    const slicedProducts = data.slice(startIndex, endIndex);

    res.status(200).json({
      message: "Product fetched !",
      products: slicedProducts,
      totalItems: data.length,
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

exports.getProductsExchangePoint = async (req, res, next) => {
  const consumerId = req.params.consumerId;
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 10; // Lấy tham số query hoặc mặc định là 10

  // Chuyển đổi sang kiểu số nguyên
  const pageNumber = parseInt(currentPage);
  const itemsPerPage = parseInt(perPage);

  try {
    const pointConsumer = await Consumer.getPoints(consumerId);
    if (pointConsumer.length === 0) {
      const error = new Error("Could not find consumerID ! ");
      error.statusCode = 404;
      throw error;
    }
    const tampArr = [];
    await Promise.all(
      pointConsumer.map(async (data) => {
        const tamp = await Consumer.getProductsExchangePoint(
          data.ID_Partners,
          data.POINTS
        );
        tampArr.push(tamp);
      })
    );
    const dataTamp = tampArr.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);

    const data = dataTamp.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.ID_PRODUCTS === obj.ID_PRODUCTS)
    );

    // Tính chỉ số bắt đầu và kết thúc của mảng dựa trên trang và số lượng mục trên mỗi trang
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Cắt mảng theo chỉ số bắt đầu và kết thúc
    const slicedProducts = data.slice(startIndex, endIndex);

    res.status(200).json({
      message: "Product fetched !",
      products: slicedProducts,
      totalItems: data.length,
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

exports.updateInfoConsumer = async (req, res, next) => {
  const consumerId = req.params.consumerId;

  const nameConsumer = req.body.name;
  const birthday = req.body.birthday;
  const address = req.body.address;
  const email = req.body.email;

  // Đổi link onRender ở đây
  const imgUrl =
    req.files.length === 0
      ? null
      : `http://localhost:4132/images/${req.files[0].filename}`;

  const updateConsumer = {
    id: consumerId,
    nameConsumer: nameConsumer,
    birthday: birthday,
    address: address,
    email: email,
    img: imgUrl,
  };

  try {
    const haveConsumer = await Consumer.haveConsumer(updateConsumer.id);
    if (haveConsumer.length === 0) {
      const error = new Error("Could not find Consumer !");
      error.statusCode = 404;
      throw error;
    }
    const haveEmail = await Consumer.haveEmail(updateConsumer.email);
    if (haveEmail.length === 0) {
      const error = new Error("Email has already !");
      error.statusCode = 404;
      throw error;
    }

    const updateProfile = await Consumer.updateProfile(updateConsumer);
    res.status(200).json({
      message: "Update profile consumer successfully !",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPartnersConsumer = async (req, res, next) => {
  const consumerId = req.params.consumerId;

  // Phân trang product
  const currentPage = req.query.page || 1; // Lấy tham số query hoặc mặc định là 1
  const perPage = req.query.perPage || 8; // Lấy tham số query hoặc mặc định là 4

  try {
    const count = await Consumer.getPartnerConsumer(consumerId, null, null);

    const skip = (currentPage - 1) * perPage;
    const limit = Number(perPage);

    const partners = await Consumer.getPartnerConsumer(consumerId, skip, limit);

    if (partners.length === 0) {
      const error = new Error("Could not find partners ! ");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Fetched partners successfully ! ",
      partners: partners,
      totalItems: count.length,
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

exports.postCart = async (req, res, next) => {
  const consumerId = req.params.consumerId;

  const productId = req.body.idProduct;
  const productName = req.body.nameProduct;
  const pointType = req.body.pType;
  const price = req.body.price;
  const quantityInput = req.body.quantity;

  const cart = {
    consumerId: consumerId,
    productId: productId,
    productName: productName,
    pointType: pointType,
    price: price,
  };

  try {
    const haveProduct = await Consumer.haveCart(cart);

    const quantity =
      haveProduct.length === 0
        ? quantityInput
        : Number(haveProduct[0].QUANTITY) + Number(quantityInput);
    const totalPrice = Number(price) * Number(quantity);

    cart.totalPrice = totalPrice;
    cart.quantity = quantity;

    const addToCart =
      haveProduct.length === 0
        ? await Consumer.addToCart(cart)
        : await Consumer.updateToCart(cart);

    res.status(200).json({
      message: "Add To Cart Successfully !",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  const consumerId = req.params.consumerId;

  try {
    const partnersArr = await Consumer.getPartnersCart(consumerId);
    if (partnersArr.length === 0) {
      const error = new Error("Could not find partners consumer in cart ! ");
      error.statusCode = 404;
      throw error;
    }
    const productCart = await Consumer.getProductsCart(consumerId);
    if (productCart.length === 0) {
      const error = new Error("Could not find products consumer in cart ! ");
      error.statusCode = 404;
      throw error;
    }

    partnersArr.forEach((partner) => {
      partner.products = productCart.filter((product) => {
        return partner.ID_DoanhNghiep === product.POINT_TYPE;
      });
    });

    const totalCart = productCart.reduce((result, obj) => {
      return result + obj.TOTAL_PRICE;
    }, 0);

    const totalItems = productCart.length;

    res.status(200).json({
      message: "Get To Cart Successfully !",
      data: partnersArr,
      totalPriceCart: totalCart,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
