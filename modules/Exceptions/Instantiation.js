class InstantiationException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InstantiationException'
    }
}

module.exports = InstantiationException;