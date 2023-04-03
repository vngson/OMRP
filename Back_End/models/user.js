const { getClient } = require("../config/postgres");

exports.getEmailCustomer = async function (email) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Customers" where "Email" = $1',
    [email]
  );
  return rs.rows;
};

exports.getPhoneCustomer = async function (phone) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Customers" where "SDT" = $1',
    [phone]
  );
  return rs.rows;
};

exports.findPhoneUser = async function (phone) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."User" where "SDT" = $1',
    [phone]
  );
  return rs.rows[0];
};

exports.getLastIdCustomer = async function () {
  const client = await getClient();
  const rs = await client.query('select * from public."Customers"');
  return rs.rows.length + 1;
};

exports.getLastIdUser = async function () {
  const client = await getClient();
  const rs = await client.query('select * from public."User"');
  return rs.rows.length + 1;
};

exports.insertCustomer = async function (data) {
  const client = await getClient();
  const rs = await client.query(
    `insert into public.\"Customers\"(\"ID_Cus\",\"Name\", \"Birthday\", \"Address\", \"Email\", \"SDT\")
  VALUES ($1, $2, $3, $4,$5,$6) returning *`,
    [data.id, data.name, data.birthday, data.address, data.email, data.phone]
  );
};

exports.insertUser = async function (data) {
  const client = await getClient();
  const rs = await client.query(
    `insert into public.\"User\"(\"ID_User\",\"SDT\", \"Password\", \"Created_Date\", \"Role\")
    VALUES ($1, $2, $3, $4,$5) returning *`,
    [data.id, data.phone, data.password, data.cDate, data.role]
  );
};
