const Controllers = require("../controllers/");
const Schema = require("../modules/Schema/ReplySchema");

const {
  registerNewUserValidator,
  getRegisteredUsersValidator,
} = require("../modules/Validations/User");
const { user } = Controllers;

const User = function (fastify, options, done) {
  fastify.post(
    "/register",
    {
      schema: Schema.registerNewUserSchama,
      preHandler: registerNewUserValidator,
    },
    user.registerNewUser
  );

  fastify.get(
    "/register",
    { preHandler: [getRegisteredUsersValidator] },
    user.getAllRegisterUser
  );
  fastify.get(
    "/register/:phone",
    { preHandler: [getRegisteredUsersValidator] },
    user.getAllRegisterUser
  );

  done();
};

module.exports = User;
