const Controllers = require('../controllers/');
const Schema = require('../modules/Schema/ReplySchema');

const { user } = Controllers;

const { isUserAlreadyRegistered } = require('../middlewares/User');

const User = function (fastify, options, done) {
    fastify.post('/register', user.registerNewUser);
    done();
}

module.exports = User;