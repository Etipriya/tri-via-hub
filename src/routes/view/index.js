const { Router } = require("express");

const publicViews = require("./publicViews");

const {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
} = require("../../controllers/view/privateRender");

const router = Router();

router.use(publicViews);
//private
router.get("/dashboard", renderDashboardPage);
router.get("/quiz", renderMainQuizPage);
router.get("/quiz/create", renderCreateQuizPage);
router.get("/quiz/:id", renderQuizPageById);

module.exports = router;
