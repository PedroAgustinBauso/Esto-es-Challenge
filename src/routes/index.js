const express = require("express");
const router = express.Router();

const projectRoutes = require("./projectRoutes");

router.use("/projects", projectRoutes);

module.exports = router;
