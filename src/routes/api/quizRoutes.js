const { Router } = require("express");

const {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
} = require("../../controllers/api/quiz");

const router = Router();

router.get("/:id", getQuizById);
router.get("/search/:title", getQuizByTitle);
router.get("/", getAllQuizzes);

module.exports = router;
