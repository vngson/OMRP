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

exports.getLastIDContract = async function () {
  const client = await getClient();
  const rs = await client.query('select * from public."Contract"');
  return rs.rows.length + 1;
};

exports.insertNewContract = async function (infoContract) {
  const client = await getClient();

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
      "Chưa duyệt",
    ]
  );
};

exports.getContracts = async function (partnerId) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT C."ID_CONTRACT", C."TAX", C."DEPUTY", C."DATE_CONTRACT", C."EFFECTIVE_TIME", C."AMOUNTTOPOINTS", C."COMMISSION", C."STATUS" FROM public."Contract" as C JOIN public."Partners" as P ON C."CONTRACT_PARTNER" = P."ID_Partners" AND P."ID_Partners" = $1',
    [partnerId]
  );
  return rs.rows;
};

exports.getContractsIsValid = async function (partnerId) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT * FROM public."Contract" as C JOIN public."Partners" as P ON C."CONTRACT_PARTNER" = P."ID_Partners" WHERE P."ID_Partners" = $1 and C."STATUS" = $2',
    [partnerId, "Đã duyệt"]
  );
  return rs.rows;
};

exports.getPartnerProduct = async function (id_products, id_partners) {
  const client = await getClient();

  const rs1 = await client.query(
    `select * from public."EXCHANGE_POINT" where "ID_PRODUCTS" = $1 and "ID_PARTNERS" = $2`,
    [id_products, id_partners]
  );
  return rs1.rows;
};

exports.insertNewProductCanExchange = async function (infoProduct) {
  const client = await getClient();

  const rs1 = await client.query(
    `insert into public."EXCHANGE_POINT" (\"ID_PRODUCTS\", \"PRICE\", \"ID_PARTNERS\") 
    values ($1, $2, $3) returning *`,
    [infoProduct.id_products, infoProduct.price, infoProduct.id_partners]
  );
};

exports.deleteProduct = async function (id_products, id_partners) {
  const client = await getClient();

  const rs1 = await client.query(
    'DELETE FROM public."EXCHANGE_POINT" where "ID_PRODUCTS" = $1 and "ID_PARTNERS" = $2',
    [id_products, id_partners]
  );
  return rs1.rows;
};
