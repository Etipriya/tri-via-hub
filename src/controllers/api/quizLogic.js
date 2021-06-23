const { Question } = require("../../models");

const checkAnswer = async (req, res) => {
  try {
    const { id, givenAnswer } = req.body;

    const question = await Question.findByPk(id);

    if (givenAnswer === question.correct_option) {
      console.log("success");
      return res.status(200).json({ success: "That was correct!" });
    } else {
      console.log("fail");
      return res.status(200).json({ error: "That answer was incorrect!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create find quiz" });
  }
};

module.exports = { checkAnswer };
