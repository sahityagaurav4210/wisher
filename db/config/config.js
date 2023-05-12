require("dotenv/config");

const object = {
  username: process.env.DB_HOST,
  password: process.env.DB_PASS,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  dialect: process.env.DIALECT,
  port: process.env.DB_PORT,
};

const development = {
  ...object,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

module.exports = development;
