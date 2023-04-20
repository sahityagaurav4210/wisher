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

        await create.createLog({ source: request.body.ipAddress });
    } catch (error) {
        return reply.code(ReplyCodes.ERROR).send({
            message: 'An error occured',
            error
        })
    }
}

const authorize = function (request, reply, done) {
    try {
        const { ipAddress } = request.body;
        const firstOctet = ipAddress ? Number.parseInt(ipAddress.split('.')[0]) : null;
        const secondOctet = ipAddress ? Number.parseInt(ipAddress.split('.')[1]) : null

        if (firstOctet && firstOctet === 127) {
            delete request.body.ipAddress;
        }
        else if (firstOctet && firstOctet === 10) {
            delete request.body.ipAddress;
        }
        else if (firstOctet && ((firstOctet === 172 && secondOctet < 32) || (firstOctet === 192 && secondOctet < 169))) {
            delete request.body.ipAddress;
        }

        done();
    } catch (error) {
        return reply.code(ReplyCodes.ERROR).send({
            message: 'An error occuced',
            error
        });
    }
}


module.exports = { isValidRequest, logger, authorize };