const { Router } = require("express");

const {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
  getQuizByCategory,
} = require("../../controllers/api/quiz");

const router = Router();

router.get("/search", getQuizByTitle);
router.get("/:id", getQuizById);
router.get("/", getAllQuizzes);

module.exports = router;
