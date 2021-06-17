const { Router } = require("express");

const authRoutes = require("./auth");
const apiRoutes = require("./api");
const viewRoutes = require("./view");

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;
