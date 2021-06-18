const handleLogout = (req, res) => {
  try {
    if (req.session.isLoggedIn) {
      req.session.destroy(() => {
        return res.status(200).json({ data: "Successfully logged out" });
      });
    } else {
      return res.status(500).json({ error: "Failed to logout" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to logout" });
  }
};

module.exports = handleLogout;
