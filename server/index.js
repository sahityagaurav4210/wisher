const fastify = require('fastify');

const { Sequelize } = require('sequelize');
const { DB_PASS, DB_HOST, DB_NAME, HOST, DB_PORT, DIALECT, PORT } = process.env;

const app = fastify();

app.register(require('../routes/index'), {
  prefix: '/'
});

class Bootup {
  static connect = async function () {
    try {
      const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASS, {
        host: HOST,
        port: DB_PORT,
        dialect: DIALECT
      });

      await sequelize.authenticate();
      return true;
    } catch (error) {
      throw error;
    }
  }

  static start = async function () {
    try {
      return await app.listen({
        port: PORT,
        host: HOST
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Bootup;