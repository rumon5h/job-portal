const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobs.controllers");

router.route("/").get(jobsController.getAllJob);

router.route("/:id").get(jobsController.getSpecificJob);

module.exports = router;
