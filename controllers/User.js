const User = require('../Types/User');
const ReplyCodes = require('../modules/Enums/Reply');
const Bootup = require('../server/index');

let user = new User();
let rspMsg;

const registerNewUser = async function (request, reply) {
  const { errorParser } = Bootup.SERVINSTANCE;

  try {
    await user.registerNewUser(request.body);
    rspMsg = {
      message: 'Registered successfuly',
      user: request.body
    }
    return reply.code(201).send(rspMsg);
  } catch (error) {
    console.log('================Error in registerNewUser endpoint===================='.red);
    rspMsg = errorParser(error);
    return reply.code(rspMsg.code).send(rspMsg);
  }
}

const getAllRegisterUser = async function (request, reply) {
  const { errorParser } = Bootup.SERVINSTANCE;

  try {

    const record = await user.getRegisteredUsers(request.params.phone);
    rspMsg = {
      message: 'Request successful',
      matchedCount: record.length,
      record
    }

    return reply.code(ReplyCodes.OK).send(rspMsg);
  } catch (error) {
    console.error('=====An error occured inside of getAllRegisterUser endpoint method========');
    rspMsg = errorParser(error);

    return reply.code(rspMsg.code).send(rspMsg);
  }
}

module.exports = { registerNewUser, getAllRegisterUser };