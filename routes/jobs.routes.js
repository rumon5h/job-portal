const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobs.controllers");
const authorization = require("../middlewares/authorization");
const { verifyToken } = require("../middlewares/verifyToken");

router
  .route("/")
  .get(jobsController.getAllJob)
  .post(
    verifyToken,
    authorization("admin", "hiring-manager"),
    jobsController.saveAJob
  );

router.route("/:id").get(jobsController.getSpecificJob);

module.exports = router;
