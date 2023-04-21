const Errors = require("../modules/Enums/ErrorMsgs");
const ReplyCodes = require("../modules/Enums/Reply");

const errorParser = function (error) {
    let errorMsg;

    switch (error.name) {
        case 'RecordExistsException':
            errorMsg = {
                code: ReplyCodes.BADRESPONSE,
                name: 'RecordExistsException',
                error: Errors.RecordExistsExceptionMsg.message
            }
            return errorMsg;
        case 'NotImplementedException':
            errorMsg = {
                code: ReplyCodes.ERROR,
                name: 'NotImplementedException',
                error: Errors.NotImplementedExceptionMsg.message
            }
            return errorMsg;
        case 'InstantiationException':
            errorMsg = {
                code: ReplyCodes.ERROR,
                name: 'InstantiationException',
                error: Errors.InstantiationExceptionMsg.message
            }
            return errorMsg;
        case 'RecordNotExistsException':
            errorMsg = {
                code: ReplyCodes.NOTFOUND,
                name: 'RecordNotExistsException',
                error: Errors.RecordNotExistsExceptionMsg.message
            }
            return errorMsg;

        default:
            errorMsg = {
                code: ReplyCodes.ERROR,
                name: 'Error',
                error: 'An error occured'
            }
            return errorMsg;
    }
}

const Error = function (fastify, options, done) {
    fastify.decorate('errorParser', errorParser);
    done();
}

Error[Symbol.for('skip-override')] = true;

module.exports = Error;