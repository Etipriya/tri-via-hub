const { Router } = require("express");

const {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
} = require("../../controllers/api/getQuiz");

const {
  createQuiz,
  createQuestion,
  createAnswer,
  saveScore,
  deleteQuiz,
} = require("../../controllers/api/postQuiz");

const { checkAnswer } = require("../../controllers/api/quizLogic");

const router = Router();

router.get("/search", getQuizByTitle);
router.post("/create", createQuiz);
router.get("/:id", getQuizById);
router.get("/", getAllQuizzes);
router.delete("/:id", deleteQuiz);

router.post("/create/question", createQuestion);
router.post("/create/question/answer", createAnswer);
router.post("/check-answer", checkAnswer);

router.post("/:id/score", saveScore);

module.exports = router;
