const { getClient } = require("../config/postgres");

exports.getAccountConsumer = async function () {
  const client = await getClient();
  const rs = await client.query(
    'SELECT AC."ID_Login",AC."Username",AC."ROLE" AS "Permission",AC."Status",CUS."NAME",CUS."Birthday",CUS."Address",CUS."Email",CUS."Phone" FROM public."Account" AS AC, public."Customers" AS CUS WHERE AC."Username" = CUS."Phone"'
  );
  return rs.rows;
};

exports.getAccountPartner = async function () {
  const client = await getClient();
  const rs = await client.query(
    'SELECT AC."ID_Login",AC."Username",AC."ROLE" AS "Permission",AC."Status",PA."Name",PA."Email",PA."Address",PA."Phone",PA."url" FROM public."Account" AS AC, public."Partners" AS PA WHERE AC."Username" = PA."Phone"'
  );
  return rs.rows;
};

exports.getAccountEmployee = async function () {
  const client = await getClient();
  const rs = await client.query(
    'SELECT AC."ID_Login",AC."Username",AC."ROLE" AS "Permission",AC."Status",EM."NAME",EM."BIRTHDAY",EM."EMAIL",EM."PHONE",EM."ADDRESS",EM."SALARY",EM."ALLOWANCE",EM."ROLE" FROM public."Account" AS AC, public."Employees" AS EM WHERE AC."Username" = EM."PHONE"'
  );
  return rs.rows;
};

exports.updateAccountStatus = async function (id, status) {
  const client = await getClient();
  const rs = await client.query(
    'UPDATE public."Account" SET "Status" = $1 WHERE "ID_Login" = $2 ',
    [status, id]
  );

  return rs;
};

exports.insertNewProduct = async function (info) {
  const client = await getClient();
  const rs = await client.query(
    'UPDATE public."Account" SET "Status" = $1 WHERE "ID_Login" = $2 ',
    [,]
  );

  return rs;
};
