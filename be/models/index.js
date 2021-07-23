const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'dev';
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url[env];
db.params = dbConfig.url.params;
db.cars = require("./car.model.js")(mongoose);

module.exports = db;