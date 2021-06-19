const { Router } = require("express");

const authenticate = require("../../middleware/authenticate");

const publicViews = require("./publicViews");
const privateViews = require("./privateViews");

const router = Router();

router.use(publicViews);
router.use(authenticate, privateViews);

module.exports = router;
