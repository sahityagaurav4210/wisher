const ReplyCodes = require('../modules/Enums/Reply');
const AllowedRequest = require('../modules/Enums/Requests');

let rspMsg;

const isValidRequest = function (request, reply, done) {
    if (AllowedRequest[request.method])
        done();
    else {
        rspMsg = {
            message: 'This method is currently not supported'
        }
        return reply.code(ReplyCodes.UNAVAILABLE).send(rspMsg);
    }
}

const logger = function (request, reply, done) {
    console.info(`\n====A request received at ${new Date().toLocaleString()} for ${request.url} and method was ${request.method}====\n`.cyan);
    done();
}

module.exports = { isValidRequest, logger };