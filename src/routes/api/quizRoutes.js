const { Router } = require("express");

const {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
} = require("../../controllers/api/getQuiz");

const {
  createQuiz,
  createQuestion,
} = require("../../controllers/api/postQuiz");

const router = Router();

router.get("/search", getQuizByTitle);
router.get("/:id", getQuizById);
router.get("/", getAllQuizzes);
router.post("/create", createQuiz);
router.post("/create/question", createQuestion);

module.exports = router;
