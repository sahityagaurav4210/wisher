class RecordNotExistsException extends Error {
    constructor(message) {
        super(message);
        this.name = 'RecordNotExistsException';
    }
}

module.exports = RecordNotExistsException;