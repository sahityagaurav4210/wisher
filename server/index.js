const fastify = require('fastify')();
const fs = require('fs');

const SYSTEM = require('../plugins/variables');

const { Sequelize } = require('sequelize');

const { isValidRequest, logger } = require('../middlewares/Request');

fastify.register(require('../routes/index'), {
  prefix: '/'
});

fastify.register(SYSTEM);

fastify.addHook('preHandler', logger);
fastify.addHook('preHandler', isValidRequest);

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
      const { DB_PASS, DB_HOST, DB_NAME, HOST, DB_PORT, DIALECT, PORT } = fastify.SYSTEM_VARS;

      
      return await fastify.listen({
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