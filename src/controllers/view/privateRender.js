

const renderDashboardPage = (req, res) => {
  res.send("Dashboard Page");
};
const renderMainQuizPage = (req, res) => {
  res.send("Main quiz page");
};
const renderQuizPageById = (req, res) => {
  res.send("Quiz page by ID");
};
const renderCreateQuizPage = (req, res) => {
  res.send("Create quiz page");
};

module.exports = {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
};
