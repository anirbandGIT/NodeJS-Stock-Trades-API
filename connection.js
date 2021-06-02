// You can safely remove the initialization of the connectionManager object once you have selected an ORM to use
let connectionManager = {getConnection: () => {}, clearDatabase: () => {}, closeConnection: () => {}};

// Uncomment the code below to use Sequelize ORM
// const SequelizeConnection = require('./lib/sequelize.connection');
// connectionManager = new SequelizeConnection();


// Uncomment the code below to use Mongoose ORM
// const MongooseConnection = require('./lib/mongoose.connection');
// connectionManager = new MongooseConnection();

module.exports = connectionManager;
