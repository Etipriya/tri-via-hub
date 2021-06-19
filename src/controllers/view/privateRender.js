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
    let formattedQuizzes = allQuizzes.map((quiz) => quiz.get({ plain: true }));

    formattedQuizzes = formattedQuizzes.slice(0, 8);

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

module.exports = {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
};
