const { Router } = require("express");

const {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
  renderSearchedQuizzes,
} = require("../../controllers/view/privateRender");

const router = Router();

//private
router.get("/dashboard", renderDashboardPage);
router.get("/quiz", renderMainQuizPage);
// router.get("/trivia-quizzes", renderDashboardPage);
router.get("/quiz/search", renderSearchedQuizzes);
router.get("/quiz/create", renderCreateQuizPage);
router.get("/quiz/:id", renderQuizPageById);

module.exports = router;
