const mongoose = require("mongoose");
const config = require('config');

mongoose.connect(config.get('db.uri'), config.get('db.options'))
  .then(() => {
    mongoose.Promise = global.Promise;
  });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;
