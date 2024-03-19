const cors = require("cors");
const express = require("express");

const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");
const connectDB = require("./db/conn");

connectDB();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Increase maximum payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Image Hub API");
});
app.use("/auth", authRoutes);
app.use("/images", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
