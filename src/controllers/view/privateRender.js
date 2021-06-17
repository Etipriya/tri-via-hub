const renderDashboardPage = (req, res) => {
  res.render("dashboard");
};
const renderMainQuizPage = (req, res) => {
  res.render("quizzes");
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
