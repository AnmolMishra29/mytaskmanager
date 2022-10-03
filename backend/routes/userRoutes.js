const express = require("express");
const { registerUser, authUser } = require("../controller/userController");
const router = express.Router();
console.log(authUser);
router.route("/").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
