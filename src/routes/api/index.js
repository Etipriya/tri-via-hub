const { Router } = require("express");

const quizRoutes = require("./quizRoutes");
const userRoutes = require("./userRoutes");

const router = Router();

router.use("/quiz", quizRoutes);
router.use("/user", userRoutes);

module.exports = router;
