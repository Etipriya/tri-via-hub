const { Router } = require("express");

const {
  renderSignupPage,
  renderLoginPage,
  renderHomePage,
} = require("../../controllers/view/publicRender");

const router = Router();

//public
router.get("/sign-up", renderSignupPage);
router.get("/login", renderLoginPage);

router.get("/*", renderHomePage);

module.exports = router;
