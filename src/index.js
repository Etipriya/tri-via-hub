const util = require("util");

const connection = require("./config/connection");
const { User, Quiz, Question, Answer, Score } = require("./models");

const getAllQuizzes = async () => {
  try {
    await connection.sync();

    const allQuizzes = await Quiz.findAll({
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
      ],
    });
    const quizzes = allQuizzes.map((quiz) => quiz.get({ plain: true }));
    console.log(util.inspect(quizzes, { depth: null }));
  } catch (error) {
    console.log(error);
  }
};

const getSingleQuiz = async () => {
  try {
    await connection.sync();

    const id = 3;

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

    console.log(util.inspect(formattedQuiz, { depth: null }));
  } catch (error) {
    console.log(error);
  }
};

const getQuizByCategory = async () => {
  try {
    await connection.sync();

    const category = "Entertainment: Video Games";

    const quizzes = await Quiz.findAll({
      where: {
        category,
      },
    });

    const formattedQuizzes = quizzes.map((quiz) => quiz.get({ plain: true }));

    console.log(formattedQuizzes);
  } catch (error) {
    console.log(error);
  }
};

const getQuestionsByQuizId = async () => {
  try {
    await connection.sync();

    const id = 1;

    const questions = await Question.findAll({
      where: {
        quiz_id: id,
      },
      include: [
        {
          model: Quiz,
          attributes: ["title"],
        },
      ],
    });

    const formattedQuestions = questions.map((question) =>
      question.get({ plain: true })
    );

    console.log(formattedQuestions);
  } catch (error) {
    console.log(error);
  }
};

const getUserQuizzes = async () => {
  try {
    await connection.sync();

    const id = 2;

    const user = await User.findByPk(id, {
      include: [
        { model: Quiz, attributes: ["title", "category", "difficulty"] },
      ],
    });

    const formattedUser = user.get({ plain: true });

    console.log(util.inspect(formattedUser, { depth: null }));
  } catch (error) {
    console.log(error);
  }
};

// getAllQuizzes();
getSingleQuiz();
// getQuizByCategory();

// getQuestionsByQuizId();

// getUserQuizzes();
