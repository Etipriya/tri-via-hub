const { Router } = require("express");

const { getAllQuizzes } = require("../../controllers/api/quiz");

const router = Router();

router.use("/", getAllQuizzes);

module.exports = router;
