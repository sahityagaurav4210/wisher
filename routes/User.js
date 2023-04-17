const Controllers = require('../controllers/');

const { user } = Controllers;

const { isUserAlreadyRegistered } = require('../middlewares/User');

const User = function (fastify, options, done) {
    fastify.post('/register', { preHandler: [isUserAlreadyRegistered] }, user().registerNewUser);
    done();
}

module.exports = User;