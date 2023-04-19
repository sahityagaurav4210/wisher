const db = require('../db/models/');
const user = require('../db/models/user')(db.sequelize, db.Sequelize.DataTypes);
const Server = require('../server');

const IUser = require('../Interfaces/IUser');
const { RecordExistsExceptionMsg } = require('../modules/Enums/ErrorMsgs');
const Queries = require('../modules/Enums/Queries');
const RecordExistsException = require('../modules/Exceptions/RecordExists');

class User extends IUser {
    registerNewUser = async function (requestBody = {}) {
        try {
            let createdAt, updatedAt;

            createdAt = updatedAt = new Date();
            requestBody = {
                ...requestBody,
                createdAt,
                updatedAt
            }

            const [record, metadata] = await Server.Instance.query(Queries.CALL_USER_FUNCTION, { replacements: { ...requestBody } });
            const { registernewuser } = record[0];

            if (registernewuser > 0)
                return;
            else {
                RecordExistsExceptionMsg.message = 'Specified user already exists';
                throw new RecordExistsException(RecordExistsExceptionMsg.message);
            }
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