const { Router } = require("express");

const {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
} = require("../../controllers/view/privateRender");

const router = Router();

//private
router.get("/dashboard", renderDashboardPage);
router.get("/quiz", renderMainQuizPage);
router.get("/quiz/create", renderCreateQuizPage);
router.get("/quiz/:id", renderQuizPageById);

module.exports = router;
