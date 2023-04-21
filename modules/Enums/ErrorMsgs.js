const Errors = Object.freeze({
    RecordExistsExceptionMsg: {
        message: 'Record already exists.'
    },
    NotImplementedExceptionMsg: {
        message: 'This method is not implemented, please implement it before consuming'
    },
    InstantiationExceptionMsg: {
        message: 'Interfaces or abstract classes can not be instantiated'
    },
    RecordNotExistsExceptionMsg: {
        message: 'This record does not exists'
    }
});

module.exports = Errors;