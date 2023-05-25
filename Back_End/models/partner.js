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
  const rs = await client.query('select * from public."contract"');
  return rs.rows.length + 1;
};

exports.insertNewContract = async function (infoContract) {
  const client = await getClient();

  const rs1 = await client.query(
    `insert into public."contract" (\"id_contract\", \"tax\", \"deputy\", \"date_contract\", \"effective_time\", \"amounttopoints\", \"commission\", \"contract_partner\", \"status\") 
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
  )
};

exports.getContracts = async function (partnerId) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT C."id_contract", C."tax", C."deputy", C."date_contract", C."effective_time", C."amounttopoints", C."commission", C."status" FROM public."contract" as C JOIN public."partners" as P ON C."contract_partner" = P."id_partners" AND P."id_partners" = $1',
    [partnerId]
  );
  return rs.rows;
};

exports.getPartnerProduct = async function (id_products, id_partners) {
  const client = await getClient();

  const rs1 = await client.query(
    `select * from public."partner_product" where id_products = $1 and id_partners = $2`,
    [id_products, id_partners]
  )
  return rs1.rows;
};

exports.getPartnerProductCanExchange = async function (id_products, id_partners) {
  const client = await getClient();

  const rs1 = await client.query(
    `select * from public."exchange_point" where id_products = $1 and id_partners = $2`,
    [id_products, id_partners]
  )
  return rs1.rows;
};

exports.insertNewProductCanExchange = async function (infoProduct) {
  const client = await getClient();

  const rs1 = await client.query(
    `insert into public."exchange_point" (\"id_products\", \"price\", \"id_partners\") 
    values ($1, $2, $3) returning *`,
    [
      infoProduct.id_products,
      infoProduct.price,
      infoProduct.id_partners
    ]
  )
};

exports.deleteProduct = async function (id_products, id_partners) {
  const client = await getClient();

  const rs1 = await client.query(
    'DELETE FROM public."exchange_point" where id_products = $1 and id_partners = $2',
    [id_products, id_partners]
  );
  return rs1.rows;
};
