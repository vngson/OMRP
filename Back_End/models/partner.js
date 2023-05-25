const { getClient } = require("../config/postgres");

exports.getInfoPartner = async function (phone) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Partners" where "Phone" = $1',
    [phone]
  );
  return rs.rows;
};

exports.getEmailPartner = async function (email) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Partners" where "Email" = $1',
    [email]
  );
  return rs.rows;
};

exports.countProduct = async function (idPartner) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT COUNT(*) FROM public."products" as P JOIN public."partner_product" as PP on P."ID_PRODUCTS" = PP."ID_PRODUCTS" JOIN public."partners" as PN on PP."id_partners" = PN."id_partners" WHERE PN."id_partners" = $1',
    [idPartner]
  );
  return rs.rows[0];
};

exports.countProductType = async function (idPartner, type) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT COUNT(*) FROM public."products" as P JOIN public."partner_product" as PP on P."ID_PRODUCTS" = PP."ID_PRODUCTS" JOIN public."partners" as PN on PP."id_partners" = PN."id_partners" WHERE PN."id_partners" = $1 AND P."TYPE_PROC" = $2',
    [idPartner, type]
  );
  return rs.rows[0];
};

exports.getProducts = async function (skip, limit, idPartner) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" JOIN public."partner_product" as PP ON PP."ID_PRODUCTS" = P."ID_PRODUCTS" join public."partners" PN on PP."id_partners" = PN."id_partners" AND PN."id_partners" = $2 ORDER BY P."ID_PRODUCTS" ASC OFFSET $3 LIMIT $4',
    [1, idPartner, skip, limit]
  );
  return rs.rows;
};

exports.getProductsType = async function (skip, limit, idPartner, type) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" AND P."TYPE_PROC" = $2 JOIN public."partner_product" as PP ON PP."ID_PRODUCTS" = P."ID_PRODUCTS" join public."partners" PN on PP."id_partners" = PN."id_partners" AND PN."id_partners" = $3 ORDER BY P."ID_PRODUCTS" ASC OFFSET $4 LIMIT $5',
    [1, type, idPartner, skip, limit]
  );
  return rs.rows;
};

exports.getProduct = async function (idPartner, idProduct) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND P."ID_PRODUCTS" = $1 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" JOIN public."partner_product" as PP ON PP."ID_PRODUCTS" = P."ID_PRODUCTS" join public."partners" PN on PP."id_partners" = PN."id_partners" AND PN."id_partners" = $2',
    [idProduct, idPartner]
  );
  return rs.rows;
};