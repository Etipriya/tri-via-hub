const { Router } = require("express");

const {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
  createQuiz,
} = require("../../controllers/api/quiz");

const router = Router();

router.get("/search", getQuizByTitle);
router.get("/:id", getQuizById);
router.get("/", getAllQuizzes);
router.post("/create", createQuiz);

module.exports = router;
