const { getClient } = require("../config/postgres");
exports.getInfoPartner = async function (phone) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Partners" where "Phone" = $1',
    [phone]
  );
  return rs.rows;
};
