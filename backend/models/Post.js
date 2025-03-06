const db = require("../config/database");

exports.getAllActivityLog = function (callback) {
  db.query("SELECT * FROM activity_log", callback);
};

exports.createActivityLog = function (newTodo, callback) {
  db.query("INSERT INTO activity_log SET ?", newTodo, callback);
};
