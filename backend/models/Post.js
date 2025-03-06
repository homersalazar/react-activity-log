const db = require("../config/database");

exports.getAllActivityLog = function (callback) {
  db.query("SELECT * FROM activity_log", callback);
};

// Ensure the method name matches in the model
exports.createActivityLog = function (logData, callback) {
  db.query("INSERT INTO activity_log SET ?", logData, callback);
};
