class RecordExistsException extends Error {
    constructor(message) {
        super(message)
        this.name = 'RecordExistsException';
    }
}

module.exports = RecordExistsException;