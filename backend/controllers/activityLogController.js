const activityLog = require("../models/Post");

exports.getAllActivityLog = function (req, res) {
  activityLog.getAllActivity((err, todos) => {
    if (err) throw err;
    res.json(todos);
  });
};

// Add this method to handle saving the activity log
exports.createActivityLog = function (req, res) {
  const { subject_type, event, subject_id, causer_id, properties } = req.body;

  const logData = {
    subject_type,
    event,
    subject_id,
    causer_id,
    properties,
  };

  activityLog.createActivityLog(logData, (err, result) => {
    if (err) {
      console.error("Error saving activity log:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    res.json({ message: "Activity log saved successfully" });
  });
};
