require('dotenv/config');
const fastify = require('fastify')();

const SYSTEM = require('../plugins/System');
const ERROR = require('../plugins/Error');

const { Sequelize } = require('sequelize');
const { isValidRequest, logger, authorize } = require('../middlewares/Request');
const { SERVHOST, PORT } = process.env;

fastify.register(SYSTEM);
fastify.register(ERROR);

fastify.register(require('../routes/index'), {
  prefix: '/'
});

fastify.addHook('preHandler', authorize);
fastify.addHook('preHandler', logger);
fastify.addHook('preHandler', isValidRequest);

class Bootup {
  static #instance;
  static #DB_NAME;
  static #DB_HOST;
  static #DIALECT;
  static #DB_PORT;
  static #DB_PASS;
  static #server;
  static #HOST;

  static connect = async function () {
    try {
      const sequelize = new Sequelize(Bootup.#DB_NAME, Bootup.#DB_HOST, Bootup.#DB_PASS, {
        host: Bootup.#HOST,
        port: Bootup.#DB_PORT,
        dialect: Bootup.#DIALECT
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
      const url = await fastify.listen({
        port: PORT,
        host: SERVHOST
      });
      const { DB_PASS, DB_HOST, DB_NAME, DB_PORT, DIALECT,DB_HOST_ADDR } = fastify.SYSVARS;

      Bootup.#DB_HOST = DB_HOST;
      Bootup.#DB_PASS = DB_PASS;
      Bootup.#DB_PORT = DB_PORT;
      Bootup.#DB_NAME = DB_NAME;
      Bootup.#DIALECT = DIALECT;
      Bootup.#server = fastify;
      Bootup.#HOST= DB_HOST_ADDR;

      return url;
    } catch (error) {
      throw error;
    }
  }


  static get Instance() {
    return Bootup.#instance;
  }

  static get SERVINSTANCE() {
    return Bootup.#server;
  }
}

module.exports = Bootup;