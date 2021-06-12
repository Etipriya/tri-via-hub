const connection = require("./config/connection");
const { User, Quiz, Question, Answer, Score } = require("./models");

const getAllQuizzes = async () => {
  await connection.sync();

  const allQuizzes = await Quiz.findAll({
    include: [{ model: User, attributes: ["username"] }],
  });
  const quizzes = allQuizzes.map((quiz) => quiz.get({ plain: true }));
  console.log(quizzes);
};
getAllQuizzes();
