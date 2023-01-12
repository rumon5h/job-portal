const express = require('express');
const managerController = require("../controllers/manager.controller")
const { verifyToken } = require("../middlewares/verifyToken")
const authorization = require("../middlewares/authorization")

const router = express.Router();

router.route('/').get(verifyToken, authorization("hiring-manager", "admin"), managerController.getJobs);

module.exports = router;
