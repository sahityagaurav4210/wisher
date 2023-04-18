const User = require('../Types/User');
const Codes = require('../modules/Enums/Reply');

const { errorParser } = require('../utils/index');

let user = new User();
let rspMsg;

const isUserAlreadyRegistered = async function (request, reply) {
    try {
        const { phone } = request.body;

        await user.isUserAlreadyExists(phone);
        return;

    } catch (error) {
        console.error('An error occured inside isUserAlreadyRegistered middleware method.'.red);
        rspMsg = errorParser(error);
        return reply.code(rspMsg.code).send({ ...rspMsg });
    }
}

module.exports = { isUserAlreadyRegistered };