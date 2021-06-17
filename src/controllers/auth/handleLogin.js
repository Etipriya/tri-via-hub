const handleLogin = async (req, res) => {
  try {
    const { usernameEmail, password } = req.body;

    const user = await User.findOne({
      $or: [
        {
          username: usernameEmail,
        },
        {
          email: usernameEmail,
        },
      ],
    });

    if (!user) {
      console.log("User does not exist!!!!!");
      return res.status(401).json({ error: "Failed to login" });
    }

    if (user.password !== password) {
      console.log("Incorrect password");
      return res.status(401).json({ error: "Failed to login" });
    }

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = handleLogin;
