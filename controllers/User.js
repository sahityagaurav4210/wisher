const db = require('../db/models');

const User = require('../db/models/user')(db.sequelize, db.Sequelize.DataTypes);

let rspMsg;

const registerNewUser = async function (request, reply) {
    try {
        const user = await User.create(request.body);
        rspMsg = {
            message: 'Registered successfuly',
            user
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