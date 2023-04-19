const Server = require('../server');

const IUser = require('../Interfaces/IUser');
const { RecordExistsExceptionMsg } = require('../modules/Enums/ErrorMsgs');
const Queries = require('../modules/Enums/Queries');
const RecordExistsException = require('../modules/Exceptions/RecordExists');

class User extends IUser {
    registerNewUser = async function (requestBody = {}) {
        try {
            const { email } = requestBody;
            let createdAt, updatedAt;

            // Formatting the received request
            requestBody = email ? { ...requestBody } : { email: null, ...requestBody };
            createdAt = updatedAt = new Date();
            requestBody = {
                ...requestBody,
                createdAt,
                updatedAt
            }

            //Creating a record in database
            const [record, metadata] = await Server.Instance.query(Queries.CALL_USER_FUNCTION, { replacements: { ...requestBody } });

            //Checking whether record created or not and taking actions
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
}

module.exports = User;