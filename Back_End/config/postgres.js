const pg = require("pg");

module.exports.getClient = async () => {
  const client = new pg.Client({
    host: "dpg-cgld7c4eoogkndnqu3ag-a.oregon-postgres.render.com",
    port: "5432",
    user: "ecdatabase_user",
    password: "fsOX7ePNj8KzTanQLYBRGGkxCs4z6MDA",
    database: "ql_ec_project",
    ssl: true,
  });
  await client.connect();
  // Thêm phương thức release để giải phóng kết nối
  client.release = () => {
    client.end();
  };
  return client;
};
