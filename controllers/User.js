const User = require('../Types/User');

let user = new User();
let rspMsg;

const registerNewUser = async function (request, reply) {
  try {
    const record = await user.registerNewUser(request.body);
    rspMsg = {
      message: 'Registered successfuly',
      user: record
    }
    return reply.code(201).send(rspMsg);
  } catch (error) {
    console.log('Error in registerNewUser endpoint.');
    console.log(error);
    rspMsg = {
      message: 'An error occured'
    }
    return reply.code(500).json(rspMsg);
  }
}

module.exports = { registerNewUser };