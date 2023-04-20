const Errors = require('../modules/Enums/ErrorMsgs');
const InstantiationException = require('../modules/Exceptions/Instantiation');
const NotImplementedException = require('../modules/Exceptions/NotImplemented');


class ICreateLog {
    constructor() {
        if (this.constructor === ICreateLog) {
            throw new InstantiationException(Errors.InstantiationExceptionMsg.message);
        }
    }

    createLog = async function (logBody = {}) {
        throw new NotImplementedException(Errors.NotImplementedExceptionMsg.message);
    }
}

module.exports = ICreateLog;