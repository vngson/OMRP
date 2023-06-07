const { getClient } = require("../config/postgres");

exports.getAccountConsumer = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT AC."ID_Login",AC."Username",AC."ROLE" AS "Permission",AC."Status",CUS."NAME" AS "Name",CUS."Address",CUS."Email",CUS."Phone",CUS."IMG" AS "Img" FROM public."Account" AS AC, public."Customers" AS CUS WHERE AC."Username" = CUS."Phone"'
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getAccountPartner = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT AC."ID_Login",AC."Username",AC."ROLE" AS "Permission",AC."Status",PA."Name",PA."Email",PA."Address",PA."Phone",PA."url" as "Img" FROM public."Account" AS AC, public."Partners" AS PA WHERE AC."Username" = PA."Phone"'
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getAccountEmployee = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT AC."ID_Login",AC."Username",AC."ROLE" AS "Permission",AC."Status",EM."NAME",EM."BIRTHDAY",EM."EMAIL",EM."PHONE",EM."ADDRESS",EM."SALARY",EM."ALLOWANCE",EM."ROLE" FROM public."Account" AS AC, public."Employees" AS EM WHERE AC."Username" = EM."PHONE"'
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateAccountStatus = async function (id, status) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'UPDATE public."Account" SET "Status" = $1 WHERE "ID_Login" = $2 ',
      [status, id]
    );

    return rs;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getAccount = async function (id) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT * FROM  public."Account"  WHERE "ID_Login" = $1 ',
      [id]
    );

    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getLastIDProduct = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Products" ORDER BY "ID_PRODUCTS" DESC'
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getURLTypeProduct = async function (type) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select "Img" from public."Type_Products" where "TYPE_PROD" = $1',
      [type]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.insertNewProduct = async function (infoProduct) {
  const client = await getClient();
  try {
    const rs1 = await client.query(
      `insert into public.\"Products\"(\"ID_PRODUCTS\",\"NAME\", \"INFOR_PRODUCTS\", \"ADD_DATE\", \"QUANTITY\", \"PRICE\")
    VALUES ($1, $2, $3, $4,$5,$6) returning *`,
      [
        infoProduct.id,
        infoProduct.nameProduct,
        infoProduct.desc,
        infoProduct.date,
        infoProduct.quantity,
        infoProduct.price,
      ]
    );

    const rs2 = await client.query(
      `insert into public.\"Type_Products\"(\"ID_PRODUCTS\",\"TYPE_PROD\", \"Img\")
    VALUES ($1, $2, $3) returning *`,
      [infoProduct.id, infoProduct.typeProduct, infoProduct.typeUrl]
    );

    infoProduct.imageUrls.map(async (data, index) => {
      const rs3 = await client.query(
        `insert into public.\"IMAGE_PRODUCT\"(\"ID_PRODUCTS\",\"STT\", \"URL\")
    VALUES ($1, $2, $3) returning *`,
        [infoProduct.id, index + 1, data]
      );
    });
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateProductNoFile = async function (infoProduct) {
  const client = await getClient();

  try {
    const rs1 = await client.query(
      'UPDATE public."Products" SET "NAME" = $1, "QUANTITY" = $2 , "PRICE" = $3 WHERE "ID_PRODUCTS" = $4',
      [
        infoProduct.nameProduct,
        infoProduct.quantity,
        infoProduct.price,
        infoProduct.id,
      ]
    );

    const rs2 = await client.query(
      'UPDATE public."Type_Products" SET "TYPE_PROD" = $1, "Img" = $2 WHERE "ID_PRODUCTS" = $3',
      [infoProduct.typeProduct, infoProduct.typeUrl, infoProduct.id]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updateProduct = async function (infoProduct) {
  const client = await getClient();

  try {
    const rs1 = await client.query(
      'UPDATE public."Products" SET "NAME" = $1, "QUANTITY" = $2 , "PRICE" = $3 WHERE "ID_PRODUCTS" = $4',
      [
        infoProduct.nameProduct,
        infoProduct.quantity,
        infoProduct.price,
        infoProduct.id,
      ]
    );
    const rs2 = await client.query(
      'UPDATE public."Type_Products" SET "TYPE_PROD" = $1, "Img" = $2 WHERE "ID_PRODUCTS" = $3',
      [infoProduct.typeProduct, infoProduct.typeUrl, infoProduct.id]
    );
    const rs3 = await client.query(
      'DELETE FROM public."IMAGE_PRODUCT" WHERE "ID_PRODUCTS" = $1',
      [infoProduct.id]
    );

    infoProduct.imageUrls.map(async (data, index) => {
      const rs4 = await client.query(
        `insert into public.\"IMAGE_PRODUCT\"(\"ID_PRODUCTS\",\"STT\", \"URL\")
      VALUES ($1, $2, $3) returning *`,
        [infoProduct.id, index + 1, data]
      );
    });
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.deleteProduct = async function (id) {
  const client = await getClient();

  try {
    const rs2 = await client.query(
      'DELETE FROM public."Type_Products" WHERE "ID_PRODUCTS" = $1',
      [id]
    );

    const rs3 = await client.query(
      'DELETE FROM public."IMAGE_PRODUCT" WHERE "ID_PRODUCTS" = $1',
      [id]
    );
    const rs1 = await client.query(
      'DELETE FROM public."Products" WHERE "ID_PRODUCTS" = $1',
      [id]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.updatePoints = async function (idPartner, idConsumer, point) {
  const client = await getClient();

  try {
    const rs2 = await client.query(
      'UPDATE public."ACCUMULATION_POINTS" SET "POINTS" = $1 WHERE "ID_CUSTOMERS" = $2 AND "ID_TYPEP" = $3',
      [point, idConsumer, idPartner]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getIdConsumer = async function (username) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select "ID_Customers" as "id" from public."Customers" where "Phone" = $1',
      [username]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPoints = async function () {
  const client = await getClient();
  try {
    const rs = await client.query(
      'SELECT P."ID_Partners" AS "id",P."Name" as "name", P."Email" as "email", P."Address" as "address",P."Phone" as "phone",C."Phone" as "username", AP."POINTS" as "point" FROM public."ACCUMULATION_POINTS" AS AP, public."Partners" AS P, public."Customers" AS C WHERE AP."ID_CUSTOMERS" = C."ID_Customers" AND AP."ID_TYPEP" = P."ID_Partners" '
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};
