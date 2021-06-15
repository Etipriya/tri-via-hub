const { Router } = require("express");

const viewRoutes = require("./view");
const apiRoutes = require("./api");

const router = Router();

router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;
