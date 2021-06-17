const renderSignupPage = (req, res) => {
  res.render("sign-up-page");
};

const renderLoginPage = (req, res) => {
  res.render("login-page");
};

const renderHomePage = (req, res) => {
  res.render("home-page");
};

module.exports = { renderSignupPage, renderLoginPage, renderHomePage };
