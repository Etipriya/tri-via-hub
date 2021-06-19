const { Router } = require("express");

const authRoutes = require("./auth");
const apiRoutes = require("./api");
const viewRoutes = require("./view");

const authenticate = require("../middleware/authenticate");

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", authenticate, apiRoutes);
router.use("/", viewRoutes);

module.exports = router;
