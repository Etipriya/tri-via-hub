const { Router } = require("express");

const { getUserFavourites } = require("../../controllers/api/user");

const router = Router();

router.get("/:id/favourites", getUserFavourites);

module.exports = router;
