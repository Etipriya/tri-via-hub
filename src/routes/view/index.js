const { Router } = require("express");

const {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
} = require("../../controllers/view/privateRender");

const {
  renderSignupPage,
  renderLoginPage,
  renderHomePage,
} = require("../../controllers/view/publicRender");

const router = Router();

//public
router.get("/sign-up", renderSignupPage);
router.get("/login", renderLoginPage);
//private
router.get("/dashboard", renderDashboardPage);
router.get("/quiz", renderMainQuizPage);
router.get("/quiz/create", renderCreateQuizPage);
router.get("/quiz/:id", renderQuizPageById);

router.get("/*", renderHomePage);

module.exports = router;
