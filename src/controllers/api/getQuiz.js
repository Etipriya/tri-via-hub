const { Op } = require("sequelize");

const {
  User,
  Quiz,
  Question,
  Answer,
  Score,
  Category,
} = require("../../models");

const axios = require("axios");

// The below is going to get all quizzes without a search term.
const getAllQuizzes = async (req, res) => {
  try {
    const allQuizzes = await Quiz.findAll({
      include: [
        // In the JSON it returns it will include username of the creator of the quiz
        { model: User, attributes: ["username"] },
        { model: Category, attributes: ["category_name"] },
        // Questions in the quiz with the correct option and other answers
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        // The score of each user for this quiz
        {
          model: Score,
          attributes: ["score"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });
    // Getting a plain version of the JSON data (just data we inputted)
    const quizzes = allQuizzes.map((quiz) => quiz.get({ plain: true }));

    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
  }
};

// The below will get a quiz by the ID passed into the URL
const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByPk(id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Category, attributes: ["category_name"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        { model: Score, include: { model: User, attributes: ["username"] } },
      ],
    });

    const formattedQuiz = quiz.get({ plain: true });

    console.log("formattedQuiz", formattedQuiz);

    res.status(200).json(formattedQuiz);
  } catch (err) {
    console.error(err);
  }
};

// The below will allow the user to search by title or category
const getQuizByTitle = async (req, res) => {
  try {
    // req.query will look like this in the URL: ?title=Video
    // It allows us to search for either title or category
    const { title, category_id } = req.query;

    let searchTerm;
    let columnName;

    // This if statement is used to check if the user has searched for a title or category.
    // If the ?title= exists it will set the searchTerm and columnName it looks for to title. Same for category.
    if (title) {
      searchTerm = title;
      columnName = "title";
    } else {
      searchTerm = category_id;
      columnName = "category_id";
    }

    const quizzes = await Quiz.findAll({
      where: {
        // Using a dynamic column name and search term from above. Op.like and the percentages allow us to search for anything related to that search term.
        [columnName]: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      include: [
        { model: User, attributes: ["username"] },
        { model: Category, attributes: ["category_name"] },
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

module.exports = {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
};
