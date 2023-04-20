const db = require('../db/models/index');
const Logs = require('../db/models/log')(db.sequelize, db.Sequelize.DataTypes);

const ICreateLog = require('../Interfaces/ICreateLog');

class Create extends ICreateLog {
    createLog = async function (logBody = {}) {
        try {
            await Logs.create(logBody);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Create;