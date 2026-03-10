const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const reportRoutes = require("./routes/reportRoutes")
const app = express();

//middleware Cors
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-management-system-9wcn.onrender.com"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

app.options("*", cors());

//connect DB
connectDB();

//middleware
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/api/health", (req, res) => {
    res.send("ok");
});
//route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/tasks", taskRoutes);
console.log("Serving uploads from:", path.join(__dirname, "uploads"));
//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))