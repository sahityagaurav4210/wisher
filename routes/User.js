const Controllers = require('../controllers/');
const Schema = require('../modules/Schema/ReplySchema');

const { registerNewUserValidator } = require('../modules/Validations/User');
const { user } = Controllers;

const User = function (fastify, options, done) {
    fastify.post('/register', { schema: Schema.registerNewUserSchama, preHandler: registerNewUserValidator }, user.registerNewUser);
    done();
}

module.exports = User;