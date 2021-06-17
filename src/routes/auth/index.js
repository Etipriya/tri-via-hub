const { Router } = require("express");

const router = Router();

router.post("/login", handleLogin);

module.exports = router;
