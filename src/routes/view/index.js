const { Router } = require("express");

const authenticate = require("../../middleware/authenticate");

const publicViews = require("./publicViews");
const privateViews = require("./privateViews");
const { renderHomePage } = require("../../controllers/view/publicRender");

const router = Router();

router.use(publicViews);
router.use(authenticate, privateViews);

router.get("/*", renderHomePage);

module.exports = router;
