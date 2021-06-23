const { Question } = require("../../models");

const checkAnswer = async (req, res) => {
  try {
    const { id, givenAnswer } = req.body;

    const question = await Question.findByPk(id);

    if (givenAnswer === question.correct_option) {
      res.status(200).json({ success: "That was correct!" });
    } else {
      res.status(200).json({ error: "That answer was incorrect!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create find quiz" });
  }
};

module.exports = { checkAnswer };
