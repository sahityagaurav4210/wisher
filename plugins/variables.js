

const systemVariables = function (fastify, options, done) {
    console.log('hello', { ...process.env });
    fastify.decorate('SYSTEM_VARS', { ...process.env });

    done();
}

module.exports = systemVariables;