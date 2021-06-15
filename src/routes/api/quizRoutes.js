const { Router } = require("express");

const { getAllQuizzes, getQuizById } = require("../../controllers/api/quiz");

const router = Router();

router.use("/:id", getQuizById);
router.use("/", getAllQuizzes);

module.exports = router;
