const { Router } = require("express");

const quizRoutes = require("./quizRoutes");

const router = Router();

router.use("/quiz", quizRoutes);

module.exports = router;
