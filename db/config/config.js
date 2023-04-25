require("dotenv/config");
const { DB_HOST, DB_PASS, DB_NAME, HOST, DIALECT } = process.env;

module.exports = {
  development: {
    username: DB_HOST,
    password: DB_PASS,
    database: DB_NAME,
    host: HOST,
    dialect: DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
