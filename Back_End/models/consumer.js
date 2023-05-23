const { getClient } = require("../config/postgres");

exports.getInfoConsumer = async function (phoneConsumer) {
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
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS"  ORDER BY P."ID_PRODUCTS" ASC OFFSET $2 LIMIT $3 ',
    [1, skip, limit]
  );
  return rs.rows;
};

exports.countProduct = async function () {
  const client = await getClient();
  const rs = await client.query(' SELECT COUNT(*)  FROM public."Products"');
  return rs.rows[0];
};

exports.getProductsType = async function (skip, limit, type) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" AND TP."TYPE_PROD"=$2  ORDER BY P."ID_PRODUCTS" ASC OFFSET $3 LIMIT $4 ',
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
    'SELECT P."Name", P."url" AS "IMG", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP, public."Account" AS A, public."Customers" AS C, public."Partners" AS P WHERE A."Username" = C."Phone" AND AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND A."Username" = $1',
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
    'SELECT P.*,IP."URL" AS "IMG" FROM public."PARTNER_PRODUCT" AS PP, public."Products" AS P, public."IMAGE_PRODUCT" AS IP WHERE PP."ID_PARTNERS" = $1 AND PP."ID_PRODUCTS" = P."ID_PRODUCTS" AND PP."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2',
    [idPartners, 1]
  );
  return rs.rows;
};

exports.getProductsExchangePoint = async function (idPartners, point) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P.*,IP."URL" AS "IMG" FROM public."PARTNER_PRODUCT" AS PP, public."Products" AS P, public."IMAGE_PRODUCT" AS IP, public."EXCHANGE_POINT" AS EP WHERE PP."ID_PARTNERS" = $1 AND PP."ID_PRODUCTS" = P."ID_PRODUCTS" AND PP."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2 AND EP."ID_PRODUCTS" = PP."ID_PRODUCTS" AND EP."ID_PARTNERS" = $3 AND EP."PRICE" <= $4',
    [idPartners, 1, idPartners, point]
  );
  return rs.rows;
};
