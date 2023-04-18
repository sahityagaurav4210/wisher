const db = require('../db/models/');
const user = require('../db/models/user')(db.sequelize, db.Sequelize.DataTypes);

const IUser = require('../Interfaces/IUser');
const { RecordExistsExceptionMsg } = require('../modules/Enums/ErrorMsgs');
const RecordExistsException = require('../modules/Exceptions/RecordExists');

class User extends IUser {
    registerNewUser = async function (requestBody = {}) {
        try {
            const record = await user.create(requestBody);
            return record;
        } catch (error) {
            throw error;
        }
    }
    isUserAlreadyExists = async function (phone) {
        try {
            const record = await user.findOne({
                where: {
                    phone
                }
            });

            if (!record)
                return false;
            else
                throw new RecordExistsException(RecordExistsExceptionMsg.message);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;