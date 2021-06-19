const renderSignupPage = (req, res) => {
  res.render("sign-up-page");
};

const renderLoginPage = (req, res) => {
  res.render("login-page");
};

const renderHomePage = (req, res) => {
  const { isLoggedIn } = req.session;
  res.render("home-page", { isLoggedIn });
};

module.exports = { renderSignupPage, renderLoginPage, renderHomePage };
