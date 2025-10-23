const config = require("../config/config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

const db = {};
db.mongoose = mongoose;
db.url = config.DB_URL;
db.Agence = require("../api/models/agence.model")(mongoose);
db.Reservation = require('../api/models/Reservation')(mongoose);
db.Users = require("../api/models/user.model")(mongoose);




module.exports = db;
