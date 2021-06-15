const { Op } = require("sequelize");

const { User, Quiz, Question, Answer, Score } = require("../../models");

const getAllQuizzes = async (req, res) => {
  try {
    const allQuizzes = await Quiz.findAll({
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        {
          model: Score,
          attributes: ["score"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });
    const quizzes = allQuizzes.map((quiz) => quiz.get({ plain: true }));

    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
  }
};

const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const singleQuiz = await Quiz.findByPk(id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        { model: Score, include: { model: User, attributes: ["username"] } },
      ],
    });

    const formattedQuiz = singleQuiz.get({ plain: true });

    res.status(200).json(formattedQuiz);
  } catch (err) {
    console.error(err);
  }
};

const getQuizByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    const quizzes = await Quiz.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        { model: Score, include: { model: User, attributes: ["username"] } },
      ],
    });

    const formattedQuizzes = quizzes.map((quiz) => quiz.get({ plain: true }));

    res.status(200).json(formattedQuizzes);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getAllQuizzes, getQuizById, getQuizByTitle };
