const Errors = require('../modules/Enums/ErrorMsgs');
const InstantiationException = require('../modules/Exceptions/Instantiation');
const NotImplementedException = require('../modules/Exceptions/NotImplemented');

class IUser {
    constructor() {
        if (this.constructor === IUser) {
            throw new InstantiationException(Errors.InstantiationExceptionMsg.message);
        }
    }
    registerNewUser = async function (requestBody = {}) {
        throw new NotImplementedException(Errors.NotImplementedExceptionMsg.message);
    }
    getRegisteredUsers = async function (phoneNumber) {
        throw new NotImplementedException(Errors.NotImplementedExceptionMsg.message);
    }
}

module.exports = IUser;