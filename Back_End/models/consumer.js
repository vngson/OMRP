const { getClient } = require("../config/postgres");

exports.getInfoConsumer = async function () {
  const client = await getClient();
  const rs = await client.query('select * from public."Customers"');
  return rs.rows;
};

exports.getCategoryProduct = async function () {
  const client = await getClient();
  const rs = await client.query(
    'SELECT DISTINCT("TYPE_PROD"), "Img" FROM public."Type_Products"'
  );
  return rs.rows;
};

exports.getProducts = async function (skip, limit) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS"   OFFSET $2 LIMIT $3 ',
    [1, skip, limit]
  );
  return rs.rows;
};

exports.getProductsSearched = async function (skip, limit, keyword) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE P."NAME" ILIKE $2 OFFSET $3 LIMIT $4 ',
    [1, `%${keyword}%`, skip, limit]
  );
  return rs.rows;
};

exports.getProductTypeSearched = async function (skip, limit, type, keyword) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE P."NAME" ILIKE $3 AND "TYPE_PROD" = $2 OFFSET $4 LIMIT $5 ',
    [1, type, `%${keyword}%`, skip, limit]
  );
  return rs.rows;
};

exports.countProductSearched = async function (keyword) {
  const client = await getClient();
  const rs = await client.query(' SELECT COUNT(*) FROM public."Products" WHERE "NAME" ILIKE $1', [`%${keyword}%`]);
  return rs.rows[0];
};

exports.countProductTypeSearched = async function (type, keyword) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT COUNT(*) FROM public."Type_Products" as TP JOIN public."Products" as P ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" WHERE "TYPE_PROD" = $1 AND P."NAME" ILIKE $2',
    [type, `%${keyword}%`]
  );
  return rs.rows[0];
};

exports.countProduct = async function () {
  const client = await getClient();
  const rs = await client.query(' SELECT COUNT(*) FROM public."Products"');
  return rs.rows[0];
};

exports.getProductsType = async function (skip, limit, type) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" AND TP."TYPE_PROD"=$2   OFFSET $3 LIMIT $4 ',
    [1, type, skip, limit]
  );
  return rs.rows;
};

exports.countProductType = async function (type) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT COUNT(*) FROM public."Type_Products" WHERE "TYPE_PROD" =$1',
    [type]
  );
  return rs.rows[0];
};

exports.getProduct = async function (id) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."STT",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND P."ID_PRODUCTS" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS"  ',
    [id]
  );
  return rs.rows;
};

exports.getPointsConsumer = async function (username) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_Partners",P."Name", P."url" AS "IMG", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP, public."Account" AS A, public."Customers" AS C, public."Partners" AS P WHERE A."Username" = C."Phone" AND AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND A."Username" = $1',
    [username]
  );
  return rs.rows;
};

exports.getPoints = async function (idConsumer) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_Partners", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP, public."Customers" AS C, public."Partners" AS P WHERE AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND C."ID_Customers" = $1',
    [idConsumer]
  );
  return rs.rows;
};

exports.getProductsPoint = async function (idPartners) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P.*,IP."URL" AS "IMG" FROM public."EXCHANGE_POINT" AS EP, public."Products" AS P, public."IMAGE_PRODUCT" AS IP WHERE EP."ID_PARTNERS" = $1 AND EP."ID_PRODUCTS" = P."ID_PRODUCTS" AND EP."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2',
    [idPartners, 1]
  );
  return rs.rows;
};

exports.getProductsExchangePoint = async function (idPartners, point) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P.*,IP."URL" AS "IMG" FROM  public."Products" AS P, public."IMAGE_PRODUCT" AS IP, public."EXCHANGE_POINT" AS EP WHERE EP."ID_PARTNERS" = $1 AND EP."ID_PRODUCTS" = P."ID_PRODUCTS" AND EP."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2 AND EP."PRICE" <= $3',
    [idPartners, 1, point]
  );
  return rs.rows;
};

exports.getPartnersProduct = async function (idProduct) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_Partners",P."Name",P."url",EP."PRICE" AS "GiaDoiThuong" FROM public."EXCHANGE_POINT" AS EP, public."Partners" AS P WHERE EP."ID_PARTNERS" = P."ID_Partners" AND EP."ID_PRODUCTS" = $1 ',
    [idProduct]
  );
  return rs.rows;
};

exports.haveConsumer = async function (idConsumer) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Customers" where "ID_Customers" = $1',
    [idConsumer]
  );
  return rs.rows;
};

exports.haveEmail = async function (email) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Customers" where "Email" = $1',
    [email]
  );
  return rs.rows;
};

exports.updateProfile = async function (infoConsumer) {
  const client = await getClient();

  const rs = await client.query(
    'UPDATE public."Customers" SET "NAME" = $1, "Birthday" = $2 , "Address" = $3,"Email" = $4, "IMG" = $5 WHERE "ID_Customers" = $6',
    [
      infoConsumer.nameConsumer,
      infoConsumer.birthday,
      infoConsumer.address,
      infoConsumer.email,
      infoConsumer.img,
      infoConsumer.id,
    ]
  );
};

exports.getPartnerConsumer = async function (idConsumer, skip, limit) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_Partners",P."Name", P."url" AS "IMG", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP, public."Customers" AS C, public."Partners" AS P WHERE AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND C."ID_Customers" = $1   OFFSET $2 LIMIT $3',
    [idConsumer, skip, limit]
  );
  return rs.rows;
};

exports.haveCart = async function (info) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT * FROM public."Cart" WHERE "ID_CUSTOMERS" = $1 AND "ID_PRODUCTS" = $2 AND "POINT_TYPE" = $3',
    [info.consumerId, info.productId, info.pointType]
  );
  return rs.rows;
};

exports.addToCart = async function (info) {
  const client = await getClient();
  const rs = await client.query(
    `insert into public.\"Cart\"(\"ID_CUSTOMERS\",\"ID_PRODUCTS\", \"NAME_PRODUCTS\", \"PRICE\", \"QUANTITY\", \"TOTAL_PRICE\",\"POINT_TYPE\")
    VALUES ($1, $2, $3, $4,$5,$6,$7) returning *`,
    [
      info.consumerId,
      info.productId,
      info.productName,
      info.price,
      info.quantity,
      info.totalPrice,
      info.pointType,
    ]
  );
};

exports.updateToCart = async function (info) {
  const client = await getClient();

  const rs = await client.query(
    'UPDATE public."Cart" SET "QUANTITY" = $1, "TOTAL_PRICE" = $2 WHERE "ID_CUSTOMERS" = $3 AND "ID_PRODUCTS" = $4 AND "POINT_TYPE" = $5',
    [
      info.quantity,
      info.totalPrice,
      info.consumerId,
      info.productId,
      info.pointType,
    ]
  );
};

exports.getPartnersCart = async function (idConsumer) {
  const client = await getClient();
  const rs = await client.query(
    ' SELECT DISTINCT(P."ID_Partners") AS "ID_DoanhNghiep", P."Name" AS "TenDoanhNghiep",P."url" as "Img" FROM public."Cart" AS C, public."Partners" AS P WHERE C."ID_CUSTOMERS" = $1 AND C."POINT_TYPE" = P."ID_Partners"  ORDER BY P."Name"',
    [idConsumer]
  );
  return rs.rows;
};

exports.getProductsCart = async function (idConsumer) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT C."ID_PRODUCTS",C."NAME_PRODUCTS",C."PRICE",C."QUANTITY",C."TOTAL_PRICE",IP."URL",C."POINT_TYPE" FROM public."Cart" AS C, public."IMAGE_PRODUCT" AS IP WHERE C."ID_CUSTOMERS" = $1 AND C."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2 ORDER BY C."POINT_TYPE"',
    [idConsumer, 1]
  );
  return rs.rows;
};

exports.getExchangePointByProductId = async function (idProduct) {
  const client = await getClient();
  const rs = await client.query('SELECT "ID_PRODUCTS", "PRICE" FROM public."EXCHANGE_POINT" WHERE "ID_PRODUCTS" = $1', [idProduct])
  return rs.rows;
}