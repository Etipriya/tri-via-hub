const renderSignupPage = (req, res) => {
  res.send("Sign-up Page");
};

const renderLoginPage = (req, res) => {
  res.send("Login Page");
};

const renderHomePage = (req, res) => {
  res.send("Homepage");
};

module.exports = { renderSignupPage, renderLoginPage, renderHomePage };
