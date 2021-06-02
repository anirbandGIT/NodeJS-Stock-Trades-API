class ConnectionBase {

    getConnection() {
        throw new Error('Please implement the getConnection method in the derived class to return the connection object or Promise which resolves with the connection object')
    }

    clearDatabase() {
        throw new Error('Please implement the clearDatabase method in the derived class to delete all the items from the database')
    }

    closeConnection() {

    }
}

module.exports = ConnectionBase;
