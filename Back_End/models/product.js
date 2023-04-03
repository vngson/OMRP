const { getClient } = require("../config/postgres");

exports.getInfoProduct = async function (idSp) {
  const client = await getClient();
  const rs = await client.query('select * from public."SanPham"');
  return rs.rows;
};
