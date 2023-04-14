const { getClient } = require("../config/postgres");
exports.getInfoEmployee = async function (phone) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Employees" where "PHONE" = $1',
    [phone]
  );
  return rs.rows;
};
