const { Router } = require("express");

const router = Router();

const renderSignupPage = require("renderSignUpPage");
const renderLoginPage = require("renderLoginPage");
const renderDashboardPage = require("renderDashboardPage");
const { route } = require("..");

//public
router.get("/sign-up", renderSignupPage);
router.get("/login", renderLoginPage);
//private
router.get("/dashboard", renderDashboardPage);
router.get("/quiz", renderMainQuizPage);
router.get("/quiz/:id", renderQuizPageById);
router.get("/quiz/create", renderCreateQuizPage);

router.get("/*", renderHomePage);

module.exports = router;
