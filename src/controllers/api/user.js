const {
  User,
  Quiz,
  Question,
  Answer,
  Score,
  Favourite,
} = require("../../models");

const getUserFavourites = async (req, res) => {
  try {
    const { id } = req.params;

    const singleUser = await User.findByPk(id, {
      attributes: ["id", "first_name", "last_name", "username"],
      include: [
        {
          model: Favourite,
          attributes: ["fav_quiz_id"],
          include: { model: Quiz, attributes: ["title"] },
        },
      ],
    });

    const formattedUser = singleUser.get({ plain: true });

    res.status(200).json(formattedUser);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserFavourites };
