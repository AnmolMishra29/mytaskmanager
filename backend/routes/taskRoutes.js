const express = require("express");
const {
  getTaskExplore,
  getTasks,
  CreateTask,
  DeleteTask,
  UpdateTask,
} = require("../controller/taskController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTasks);
router
  .route("/:id")
  .get(getTaskExplore)
  .delete(protect, DeleteTask)
  .put(protect, UpdateTask);
router.route("/create").post(protect, CreateTask);

module.exports = router;
