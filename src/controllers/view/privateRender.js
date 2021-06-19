const { Op } = require("sequelize");

const { Quiz, User } = require("../../models");

const renderDashboardPage = (req, res) => {
  res.render("dashboard");
};

const renderMainQuizPage = async (req, res) => {
  try {
    const allQuizzes = await Quiz.findAll({
      include:
        // In the JSON it returns it will include username of the creator of the quiz
        { model: User, attributes: ["username"] },
      order: [["createdAt", "DESC"]],
    });
    // Getting a plain version of the JSON data (just data we inputted)
    const formattedQuizzes = allQuizzes
      .map((quiz) => quiz.get({ plain: true }))
      .slice(0, 8);

    res.render("quizzes", { formattedQuizzes });
  } catch (err) {
    console.error(err);
  }
};

const renderCreateQuizPage = (req, res) => {
  res.render("create-quiz");
};
const renderQuizPageById = (req, res) => {
  res.render("individual-quiz");
};

const renderSearchedQuizzes = async (req, res) => {
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
      include: [{ model: User, attributes: ["username"] }],
    });

    const formattedQuizzes = quizzes.map((quiz) => quiz.get({ plain: true }));

    res.render("quizzes", { formattedQuizzes });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
  renderSearchedQuizzes,
};
