const { Router } = require("express");

const {
  renderSignupPage,
  renderLoginPage,
} = require("../../controllers/view/publicRender");

const router = Router();

//public
router.get("/sign-up", renderSignupPage);
router.get("/login", renderLoginPage);

module.exports = router;
