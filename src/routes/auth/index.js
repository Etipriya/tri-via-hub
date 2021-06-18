const { Router } = require("express");

const handleLogin = require("../../controllers/auth/handleLogin");
const handleSignup = require("../../controllers/auth/handleSignup");

const router = Router();

router.post("/login", handleLogin);
router.post("/signup", handleSignup);

module.exports = router;
