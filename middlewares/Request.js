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

module.exports = { isValidRequest };