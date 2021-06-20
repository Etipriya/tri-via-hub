const { Quiz, Question, Answer } = require("../../models");

let newCreatedQuiz = {};

//Declared Create quiz
const createQuiz = async (req, res) => {
  try {
    const { title, category_id, difficulty, type } = req.body;
    const { userId } = req.session;

    const newQuiz = await Quiz.create({
      title,
      category_id,
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

//Declared Create question
const createQuestion = async (req, res) => {
  console.log(newCreatedQuiz.id);
  try {
    const { question, correct_option } = req.body;

    const newQuestion = await Question.create({
      question,
      correct_option,
      quiz_id: newCreatedQuiz.id,
    });

    newCreatedQuiz.questionId = newQuestion.id;

    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create question" });
  }
};

//Declared Create Answer
const createAnswer = async (req, res) => {
  try {
    const { option } = req.body;

    const newAnswer = await Answer.create({
      option,
      question_id: newCreatedQuiz.questionId,
    });

    res.status(201).json(newAnswer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create answer" });
  }
};

module.exports = { createQuiz, createQuestion, createAnswer };
