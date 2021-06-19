const { Quiz } = require("../../models");

const createQuiz = async (req, res) => {
  try {
    const { title, category, difficulty, type } = req.body;
    const { userId } = req.session;

    const newQuiz = await Quiz.create({
      title,
      category,
      difficulty,
      type,
      user_id: userId,
    });

    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create new quiz" });
  }
};

module.exports = { createQuiz };
