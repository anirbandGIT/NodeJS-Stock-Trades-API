const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const Trades = require('../models/trades');
const ConnectionBase = require('./connection-base');

const connect = () => sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return Trades.sync();
    })
    .then(result => {
        console.log(`Trades table created`);
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })

class SequelizeConnection extends ConnectionBase {
    getConnection() {
        if (this.promise) {
            return this.promise;
        }
        this.promise = connect();
        return this.promise
    }

    async clearDatabase() {
        await Trades.drop();
        return Trades.sync();
    }
}

module.exports = SequelizeConnection;
