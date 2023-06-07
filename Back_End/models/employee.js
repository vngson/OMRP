const { getClient } = require("../config/postgres");
exports.getInfoEmployee = async function (phone) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Employees" where "PHONE" = $1',
      [phone]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getCountContract = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(' SELECT COUNT(*)  FROM public."Contract"');
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getCountContractPendingApproval = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT COUNT(*)  FROM public."Contract" WHERE "STATUS" = $1', ["Chưa duyệt"]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getListContract = async function (skip, limit) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT CT."ID_CONTRACT",P."Name" AS "Tên Doanh Nghiệp" FROM public."Contract" as CT , public."Partners" as P WHERE CT."CONTRACT_PARTNER" = P."ID_Partners" AND CT."STATUS" = $3   OFFSET $1 LIMIT $2 ',
      [skip, limit, "Đã duyệt"]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getListContractPendingApproval = async function (skip, limit) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT CT."ID_CONTRACT",P."Name" AS"Tên Doanh Nghiệp" FROM public."Contract" as CT , public."Partners" as P WHERE CT."CONTRACT_PARTNER" = P."ID_Partners" AND CT."STATUS" = $3 OFFSET $1 LIMIT $2 ',
      [skip, limit, "Chưa duyệt"]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getContract = async function (id) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT CT."ID_CONTRACT",CT."TAX" as "Mã số thuế", CT."DATE_CONTRACT" AS "Ngày lập HĐ" ,CT."EFFECTIVE_TIME" AS "Ngày hết HĐ",CT."AMOUNTTOPOINTS" AS "Đơn vị đổi",CT."COMMISSION" AS "% giao dịch",P."Name" AS "Tên doanh nghiệp", P."Phone" as "Số điện thoại", P."Email",P."url" AS "Image" FROM public."Contract" as CT , public."Partners" as P WHERE CT."CONTRACT_PARTNER" = P."ID_Partners" AND CT."ID_CONTRACT" = $1 ',
      [id]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getListPartner = async function (skip, limit) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT * FROM public."Partners"  OFFSET $1 LIMIT $2 ',
      [skip, limit]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getCountPartner = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(' SELECT COUNT(*)  FROM public."Partners"');
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getPartner = async function (id) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT * FROM public."Partners" WHERE "ID_Partners" = $1 ',
      [id]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.getListPartnerProduct = async function (id) {
  const client = await getClient();

  try {
    const rs = await client.query(
      'SELECT P.*,TP."TYPE_PROD",IP."URL" AS "IMG" FROM public."EXCHANGE_POINT" AS EP, public."Products" AS P, public."Type_Products" AS TP, public."IMAGE_PRODUCT" AS IP WHERE EP."ID_PRODUCTS" = P."ID_PRODUCTS" AND EP."ID_PARTNERS" = $1 AND TP."ID_PRODUCTS" = P."ID_PRODUCTS" AND IP."ID_PRODUCTS" = P."ID_PRODUCTS" AND IP."STT" = $2',
      [id, 1]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateContract = async function (id) {
  const client = await getClient();
  try {
    const rs1 = await client.query('UPDATE public."Contract" SET "STATUS" = $1 WHERE "ID_CONTRACT" = $2', ["Đã duyệt", id]);
    return rs1.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }

};

exports.deleteContract = async function (id) {
  const client = await getClient();
  try {
    const rs1 = await client.query(
      'DELETE FROM public."Contract" where "ID_CONTRACT" = $1',
      [id]
    );
    return rs1.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }

};
