const util = require("util");

const connection = require("./config/connection");
const { User, Quiz, Question, Answer, Score } = require("./models");

const getAllQuizzes = async () => {
  await connection.sync();

  const allQuizzes = await Quiz.findAll({
    include: [
      { model: User, attributes: ["username"] },
      { model: Question, attributes: ["question", "correct_option"] },
    ],
  });
  const quizzes = allQuizzes.map((quiz) => quiz.get({ plain: true }));
  console.log(util.inspect(quizzes, { depth: null }));
};

const getSingleQuiz = async () => {
  await connection.sync();

  const id = 2;

  const quiz = await quiz.findByPk(id, {
    include: [{ model: User, attributes: ["username"] }],
  });

  const formattedQuiz = quiz.get({ plain: true });
  console.log(formattedQuiz);
};

getAllQuizzes();
getSingleQuiz();
