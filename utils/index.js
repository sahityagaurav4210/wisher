const Errors = require("../modules/Enums/ErrorMsgs");
const ReplyCodes = require("../modules/Enums/Reply");

const errorParser = function (error) {
    let errorMsg;

    switch (error.name) {
        case 'RecordExistsException':
            errorMsg = {
                code: ReplyCodes.BADRESPONSE,
                name: 'RecordExistsException',
                error: Errors.RecordExistsExceptionMsg.message
            }
            return errorMsg;
        case 'NotImplementedException':
            errorMsg = {
                code: ReplyCodes.ERROR,
                name: 'NotImplementedException',
                error: Errors.NotImplementedExceptionMsg.message
            }
            return errorMsg;
        case 'InstantiationException':
            errorMsg = {
                code: ReplyCodes.ERROR,
                name: 'InstantiationException',
                error: Errors.InstantiationExceptionMsg.message
            }
            return errorMsg;

        default:
            errorMsg = {
                code: ReplyCodes.ERROR,
                name: 'Error',
                error: 'An error occured'
            }
            return errorMsg;
    }
}

module.exports = { errorParser };