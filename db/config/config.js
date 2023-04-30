// require("dotenv/config");
const envs = process.argv[process.argv.length - 1].split(",");

const object = envs.reduce((accumulator, currValue) => {
  const val = currValue.split("=");

  accumulator[val[0]] = val[1];
  return accumulator;
}, {});

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
