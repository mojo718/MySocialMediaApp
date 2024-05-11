// inports connect and connection from Mongoose library
const {connect, connection} = require('mongoose');

//create a const to store the connection string
const connectionString = 'mongodb://localhost:27017/MySocialDB';

//connect to the DB using the connectionString
connect(connectionString)

//exports the connection
module.exports = connection;


