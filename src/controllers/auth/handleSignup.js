const { User } = require("../../models");

const handleSignup = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    const newUser = await User.create({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    req.session.save(() => {
      (req.session.isLoggedIn = true),
        (req.session.email = newUser.email),
        (req.session.username = newUser.username),
        (req.session.userId = newUser.id),
        res.status(201).json({ success: "User has been created!" });
    });

    console.log(req.session.isLoggedIn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = handleSignup;
