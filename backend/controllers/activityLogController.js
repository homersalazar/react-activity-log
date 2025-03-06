const activityLog = require("../models/Post");

exports.getAllActivityLog = function (req, res) {
  activityLog.getAllActivity((err, todos) => {
    if (err) throw err;
    res.json(todos);
  });
};

exports.createActivityLog = function (req, res) {
  const newTodo = {
    title: req.body.title,
    completed: req.body.completed,
  };

  Todo.createActivityLog(newTodo, (err, result) => {
    if (err) throw err;
    res.json({ message: "Todo created successfully" });
  });
};
