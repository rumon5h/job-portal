const express = require("express");
const authController = require("../controllers/auth.controllers");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.get("/me", verifyToken, authController.getMe);

module.exports = router;
