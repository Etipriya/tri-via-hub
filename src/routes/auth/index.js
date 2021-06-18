const { Router } = require("express");

const handleLogin = require("../../controllers/auth/handleLogin");
const handleSignup = require("../../controllers/auth/handleSignup");
const handleLogout = require("../../controllers/auth/handleLogout");

const router = Router();

router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.post("/logout", handleLogout);

module.exports = router;
