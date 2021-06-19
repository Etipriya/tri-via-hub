const { Router } = require("express");

const quizRoutes = require("./quizRoutes");
const userRoutes = require("./userRoutes");

const authenticate = require("../../middleware/authenticate");

const router = Router();

router.use("/quiz", authenticate, quizRoutes);
router.use("/user", authenticate, userRoutes);

module.exports = router;
