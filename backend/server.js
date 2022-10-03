const express = require("express");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------

  app.get("/", (req, res) => {
    res.send("API is running..");
  });

// --------------------------deployment------------------------------

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/Tasks", (req, res) => {
  res.json(Tasks);
});

app.get("/api/Tasks/:id", (req, res) => {
  const Task = Tasks.find((n) => n._id === req.params.id);
  res.send(Task);
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

console.log("log = ",process.env.JWT_SECRET)

app.listen(PORT, console.log(`server started on port ${PORT}`));
