const { Op } = require("sequelize");

const { User, Quiz, Question, Answer, Score } = require("../../models");

// The below is going to get all quizzes without a search term.
const getAllQuizzes = async (req, res) => {
  try {
    const allQuizzes = await Quiz.findAll({
      include: [
        // In the JSON it returns it will include username of the creator of the quiz
        { model: User, attributes: ["username"] },
        // Questions in the quiz with the correct option and other answers
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        // The score of each user for this quiz
        {
          model: Score,
          attributes: ["score"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });
    // Getting a plain version of the JSON data (just data we inputted)
    const quizzes = allQuizzes.map((quiz) => quiz.get({ plain: true }));

    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
  }
};

// The below will get a quiz by the ID passed into the URL
const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const singleQuiz = await Quiz.findByPk(id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        { model: Score, include: { model: User, attributes: ["username"] } },
      ],
    });

    const formattedQuiz = singleQuiz.get({ plain: true });

    res.status(200).json(formattedQuiz);
  } catch (err) {
    console.error(err);
  }
};

// The below will allow the user to search by title or category
const getQuizByTitle = async (req, res) => {
  try {
    // req.query will look like this in the URL: ?title=Video
    // It allows us to search for either title or category
    const { title, category } = req.query;

    let searchTerm;
    let columnName;

    // This if statement is used to check if the user has searched for a title or category.
    // If the ?title= exists it will set the searchTerm and columnName it looks for to title. Same for category.
    if (title) {
      searchTerm = title;
      columnName = "title";
    } else {
      searchTerm = category;
      columnName = "category";
    }

    const quizzes = await Quiz.findAll({
      where: {
        // Using a dynamic column name and search term from above. Op.like and the percentages allow us to search for anything related to that search term.
        [columnName]: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        { model: Score, include: { model: User, attributes: ["username"] } },
      ],
    });

    const formattedQuizzes = quizzes.map((quiz) => quiz.get({ plain: true }));

    res.status(200).json(formattedQuizzes);
  } catch (err) {
    console.error(err);
  }
};

// const getQuizByCategory = async () => {
//   try {
//     await connection.sync();

//     const category = "Entertainment: Video Games";

//     const quizzes = await Quiz.findAll({
//       where: {
//         category,
//       },
//     });

//     const formattedQuizzes = quizzes.map((quiz) => quiz.get({ plain: true }));

//     console.log(formattedQuizzes);
//   } catch (error) {
//     console.log(error);
//   }
// };

const createQuiz = async (req, res) => {
  try {
    const { title, category, difficulty, type } = req.body;
    const { userId } = req.session;

    const newQuiz = await Quiz.create({
      title,
      category,
      difficulty,
      type,
      user_id: userId,
    });

    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create new quiz" });
  }
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  getQuizByTitle,
  createQuiz,
};
