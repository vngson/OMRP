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
