const renderDashboardPage = (req, res) => {
  res.send("dashboard");
};
const renderMainQuizPage = (req, res) => {
  res.send("quizzes");
};
const renderQuizPageById = (req, res) => {
  res.send("individual-quiz");
};
const renderCreateQuizPage = (req, res) => {
  res.send("create-quiz");
};

module.exports = {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
};
