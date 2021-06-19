const { Quiz, Question } = require("../../models");

let newCreatedQuiz = {};

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

    newCreatedQuiz.id = newQuiz.id;

    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create new quiz" });
  }
};

const createQuestion = async (req, res) => {
  console.log(newCreatedQuiz.id);
  try {
    const { question, correct_option } = req.body;

    const newQuestion = await Question.create({
      question,
      correct_option,
      quiz_id: newCreatedQuiz.id,
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create question" });
  }
};

module.exports = { createQuiz, createQuestion };
