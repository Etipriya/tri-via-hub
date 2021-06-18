const { User } = require("../../models");

//using regex to check if the inputted string is an email or not (returns true or false)
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const handleLogin = async (req, res) => {
  try {
    const { usernameEmail, password } = req.body;

    //Calling regex function with the username/email that was entered, returns an object based on result of if statement.
    const constructWhere = () => {
      if (validateEmail(usernameEmail)) {
        return { email: usernameEmail };
      }
      return { username: usernameEmail };
    };

    const user = await User.findOne({
      where: constructWhere(),
    });

    const validPassword = await user.checkPassword(password);

    if (!user) {
      console.log("User does not exist!!!!!");
      return res.status(401).json({ error: "Failed to login" });
    }

    if (!validPassword) {
      console.log("Incorrect password");
      return res.status(401).json({ error: "Failed to login" });
    }

    req.session.save(() => {
      (req.session.isLoggedIn = true),
        (req.session.username = user.username),
        (req.session.email = user.email),
        (req.session.userId = user.id),
        res.status(200).json({ message: "success" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = handleLogin;
