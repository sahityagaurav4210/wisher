const User = require('./User');

class Controllers {
    static get user() {
        return User;
    }
}

module.exports = Controllers;