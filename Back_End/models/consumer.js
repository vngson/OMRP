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
