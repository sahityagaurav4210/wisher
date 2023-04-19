const User = require('../Types/User');
const { errorParser } = require('../utils');

let user = new User();
let rspMsg;

const registerNewUser = async function (request, reply) {
  try {
    await user.registerNewUser(request.body);
    rspMsg = {
      message: 'Registered successfuly',
      user: request.body
    }
    return reply.code(201).send(rspMsg);
  } catch (error) {
    console.log('Error in registerNewUser endpoint.'.red);
    rspMsg = errorParser(error);
    return reply.code(rspMsg.code).send(rspMsg);
  }
}

module.exports = { registerNewUser };