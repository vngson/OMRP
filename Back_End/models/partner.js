const { getClient } = require("../config/postgres");

exports.getInfoPartner = async function (phone) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Partners" where "Phone" = $1',
      [phone]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getEmailPartner = async function (email) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Partners" where "Email" = $1',
      [email]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getLastIDContract = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select "ID_CONTRACT" from public."Contract" order by "ID_CONTRACT" DESC'
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.insertNewContract = async function (infoContract) {
  const client = await getClient();
  try {
    const rs1 = await client.query(
      `insert into public."Contract" (\"ID_CONTRACT\", \"TAX\", \"DEPUTY\", \"DATE_CONTRACT\", \"EFFECTIVE_TIME\", \"AMOUNTTOPOINTS\", \"COMMISSION\", \"CONTRACT_PARTNER\", \"STATUS\") 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`,
      [
        infoContract.id,
        infoContract.tax,
        infoContract.deputy,
        infoContract.date,
        infoContract.effctivetime,
        infoContract.amountToPoints,
        infoContract.commission,
        infoContract.contractPartner,
        "Chưa duyệt"
      ]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getContracts = async function (partnerId) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT C."ID_CONTRACT", C."TAX", C."DEPUTY", C."DATE_CONTRACT", C."EFFECTIVE_TIME", C."AMOUNTTOPOINTS", C."COMMISSION", C."STATUS" FROM public."Contract" as C JOIN public."Partners" as P ON C."CONTRACT_PARTNER" = P."ID_Partners" AND P."ID_Partners" = $1',
      [partnerId]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getAmountToPoint = async function (partnerId) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT C."AMOUNTTOPOINTS" FROM public."Contract" as C JOIN public."Partners" as P ON C."CONTRACT_PARTNER" = P."ID_Partners" AND P."ID_Partners" = $1',
      [partnerId]
    );
    return rs.rows[0].AMOUNTTOPOINTS;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getContractsIsValid = async function (partnerId) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT * FROM public."Contract" as C JOIN public."Partners" as P ON C."CONTRACT_PARTNER" = P."ID_Partners" WHERE P."ID_Partners" = $1 and C."STATUS" = $2',
      [partnerId, "Đã duyệt"]
    );
    return rs.rows.length > 0;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPartnerProduct = async function (id_products, id_partners) {
  const client = await getClient();
  try {
    const rs1 = await client.query(
      `select * from public."EXCHANGE_POINT" where "ID_PRODUCTS" = $1 and "ID_PARTNERS" = $2`,
      [id_products, id_partners]
    );
    return rs1.rows.length > 0;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.insertNewProductCanExchange = async function (infoProduct) {
  const client = await getClient();
  try {
    const rs1 = await client.query(
      `insert into public."EXCHANGE_POINT" (\"ID_PRODUCTS\", \"PRICE\", \"ID_PARTNERS\") 
      values ($1, $2, $3) returning *`,
      [infoProduct.id_products, infoProduct.price, infoProduct.id_partners]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.deleteProduct = async function (id_products, id_partners) {
  const client = await getClient();
  try {
    const rs1 = await client.query(
      'DELETE FROM public."EXCHANGE_POINT" where "ID_PRODUCTS" = $1 and "ID_PARTNERS" = $2',
      [id_products, id_partners]
    );
    return rs1.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPoints = async function (idConsumer) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT P."ID_Partners", AP."POINTS" FROM public."ACCUMULATION_POINTS" AS AP, public."Customers" AS C, public."Partners" AS P WHERE AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" AND C."ID_Customers" = $1',
    [idConsumer]
  );
  return rs.rows;
};

exports.getListPartnerProductRemain = async function (id) {
  const client = await getClient();

  try {
    const rs = await client.query(
      'SELECT P."ID_PRODUCTS",P."NAME",P."INFOR_PRODUCTS",P."QUANTITY",P."PRICE",IP."URL" as "IMG",TP."TYPE_PROD" FROM public."Products" as P JOIN public."IMAGE_PRODUCT" as IP ON P."ID_PRODUCTS" = IP."ID_PRODUCTS" AND IP."STT" = $2 JOIN public."Type_Products" AS TP ON P."ID_PRODUCTS" = TP."ID_PRODUCTS" where P."ID_PRODUCTS" not in (SELECT P."ID_PRODUCTS" FROM public."EXCHANGE_POINT" AS EP join public."Products" AS P on EP."ID_PRODUCTS" = P."ID_PRODUCTS" join public."Type_Products" AS TP on TP."ID_PRODUCTS" = P."ID_PRODUCTS" join public."IMAGE_PRODUCT" AS IP on IP."ID_PRODUCTS" = P."ID_PRODUCTS" WHERE EP."ID_PARTNERS" = $1)',
      [id, 1]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};
