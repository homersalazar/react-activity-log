const express = require("express");
const router = express.Router();
const activityLogController = require("../controllers/activityLogController");

// Routes
router.get("/", activityLogController.getAllActivityLog);
router.post("/", activityLogController.createActivityLog);

module.exports = router;
