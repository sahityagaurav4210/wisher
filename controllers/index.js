const User = require('./User');

class Controllers {
    static user = function () {
        return User;
    }
}

module.exports = Controllers;