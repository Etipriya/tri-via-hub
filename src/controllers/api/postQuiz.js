const { Quiz, Question, Answer, Score } = require("../../models");

let newCreatedQuiz = {};

//Declared Create quiz
const createQuiz = async (req, res) => {
  try {
    const { title, category_id, difficulty } = req.body;
    const { userId } = req.session;

    const newQuiz = await Quiz.create({
      title,
      category_id,
      difficulty,
      user_id: userId,
    });

    newCreatedQuiz.id = newQuiz.id;

    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create new quiz" });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Quiz.destroy({
      where: {
        id,
      },
    });

    if (!data) {
      return res.stats(404).json({ error: "Quiz does not exist!" });
    }

    res.status(200).json({ data: "Delete successful" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete Blog Post!" });
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

const saveScore = async (req, res) => {
  try {
    const { score, quiz_id } = req.body;
    const { userId } = req.session;

    const newScore = await Score.create({
      score,
      user_id: userId,
      quiz_id,
    });

    return res.status(201).json(newScore);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create score" });
  }
};

module.exports = {
  createQuiz,
  createQuestion,
  createAnswer,
  saveScore,
  deleteQuiz,
};
