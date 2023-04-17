const Routes = function (fastify, options, done) {
    fastify.register(require('./User'), {
        prefix: '/user'
    });
    done();
}

module.exports = Routes;