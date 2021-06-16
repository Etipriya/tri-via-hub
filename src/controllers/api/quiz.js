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
    const { title, category } = req.query;

    let searchTerm;
    let columnName;

    if (title) {
      searchTerm = title;
      columnName = "title";
    } else {
      searchTerm = category;
      columnName = "category";
    }

    const quizzes = await Quiz.findAll({
      where: {
        [columnName]: {
          [Op.like]: `%${searchTerm}%`,
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

const getQuizByCategory = async () => {
  try {
    await connection.sync();

    const category = "Entertainment: Video Games";

    const quizzes = await Quiz.findAll({
      where: {
        category,
      },
    });

    const formattedQuizzes = quizzes.map((quiz) => quiz.get({ plain: true }));

    console.log(formattedQuizzes);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
  getQuizByCategory,
};
