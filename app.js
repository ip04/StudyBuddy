const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/test", require("./routes/debug"));
// app.use("/api/groups", require("./routes/groups"));
// app.use("/api/posts", require("./routes/posts"));

app.get("/", (req, res) => {
  res.send("StudyBuddy API is working 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
