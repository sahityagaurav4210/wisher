const ReplyCodes = require('../modules/Enums/Reply');
const AllowedRequest = require('../modules/Enums/Requests');

const Create = require('../Logs/Create');

let rspMsg;
let create = new Create();

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

const logger = async function (request, reply) {
    try {
        console.info(`\n====A request received at ${new Date().toLocaleString()} for ${request.url} and method was ${request.method}====\n`.cyan);

        request.body.ipAddress && await create.createLog({ source: request.body.ipAddress });
    } catch (error) {
        return reply.code(ReplyCodes.ERROR).send({
            message: 'An error occured',
            error
        })
    }
}


module.exports = { isValidRequest, logger };