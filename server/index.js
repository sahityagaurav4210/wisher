const fastify = require('fastify');
const fs = require('fs');

const { Sequelize } = require('sequelize');
const { DB_PASS, DB_HOST, DB_NAME, HOST, DB_PORT, DIALECT, PORT } = process.env;

const { isValidRequest } = require('../middlewares/Request');
const app = fastify();

app.register(require('../routes/index'), {
  prefix: '/'
});

app.addHook('preHandler', isValidRequest);

class Bootup {
  static #instance;
  static connect = async function () {
    try {
      const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASS, {
        host: HOST,
        port: DB_PORT,
        dialect: DIALECT
      });

      Bootup.#instance = sequelize;
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


  static get Instance() {
    return Bootup.#instance;
  }
}

module.exports = Bootup;