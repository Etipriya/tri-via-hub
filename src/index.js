const util = require("util");

const connection = require("./config/connection");
const { User, Quiz, Question, Answer, Score } = require("./models");

const getAllQuizzes = async () => {
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
};

const getSingleQuiz = async () => {
  try {
    await connection.sync();

    const id = 2;

    const singleQuiz = await Quiz.findByPk(id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
      ],
    });

    const formattedQuiz = singleQuiz.get({ plain: true });

    console.log(util.inspect(formattedQuiz, { depth: null }));
  } catch (error) {
    console.log(error);
  }
};

getAllQuizzes();
getSingleQuiz();
