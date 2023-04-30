require('dotenv/config');
const systemVariables = function (fastify, options, done) {
  const vars = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    DIALECT: process.env.DIALECT,
    DB_HOST_ADDR: process.env.HOST,
  };

  // Add vars object as property to fastify.helpers
  fastify.decorate("SYSVARS", vars);

  // Call done() to indicate plugin registration is complete
  done();
};

systemVariables[Symbol.for("skip-override")] = true;

module.exports = systemVariables;
