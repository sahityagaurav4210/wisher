const db = require('../db/models');
const User = require('../db/models/user')(db.sequelize, db.Sequelize.DataTypes);

const Codes = require('../modules/Enums/Reply');

let rspMsg;

const isUserAlreadyRegistered = async function (request, reply, done) {
    try {
        const { phone } = request.body;
        const user = await User.findOne({
            where: {
                phone
            }
        });

        if (!user) {
            return done();
        }
        else {
            rspMsg = {
                message: 'Request failed',
                error: 'User already exists'
            }
            return reply.code(Codes.BADRESPONSE).send(rspMsg);
        }
    } catch (error) {
        console.error(error);
        rspMsg = {
            message: 'An error occured'
        }
        return reply.code(Codes.ERROR).send(rspMsg);
    }
}

module.exports = { isUserAlreadyRegistered };