const { Router } = require("express");
const { getApiQuestions } = require("../../controllers/api/getQuiz");

const {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
  renderCreateQuestionPage,
  renderSearchedQuizzes,
  renderGenerateQuiz,
} = require("../../controllers/view/privateRender");

const router = Router();

//private
router.get("/dashboard", renderDashboardPage);
router.get("/quiz", renderMainQuizPage);
router.get("/quiz/search", renderSearchedQuizzes);
router.get("/quiz/create", renderCreateQuizPage);
router.get("/quiz/create/question", renderCreateQuestionPage);
router.get("/quiz/generate", renderGenerateQuiz);
router.get("/quiz/:id", renderQuizPageById);

module.exports = router;
