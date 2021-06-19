const { Router } = require("express");

const {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
} = require("../../controllers/api/getQuiz");

const { createQuiz } = require("../../controllers/api/postQuiz");

const router = Router();

router.get("/search", getQuizByTitle);
router.get("/:id", getQuizById);
router.get("/", getAllQuizzes);
router.post("/create", createQuiz);

module.exports = router;
