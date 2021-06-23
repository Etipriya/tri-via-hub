const { Question } = require("../../models");

const checkAnswer = async (req, res) => {
  try {
    const { id, givenAnswer } = req.body;

    const question = await Question.findByPk(id);

    return res
      .status(200)
      .json({ success: givenAnswer === question.correct_option });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create find quiz" });
  }
};

module.exports = { checkAnswer };
