const { Router } = require("express");

const handleLogin = require("../../controllers/auth/handleLogin");

const router = Router();

router.post("/login", handleLogin);

module.exports = router;
