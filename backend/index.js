const express = require("express");
const cors = require("cors");
const activityLogRoutes = require("./routes/activityLogRoutes");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Routes
app.use("/activity", activityLogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
