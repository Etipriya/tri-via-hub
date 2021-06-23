const { Op, json } = require("sequelize");
const axios = require("axios");
const getApiQuestions = require("../../fetchers/open-trivia");

const {
  Quiz,
  User,
  Category,
  Question,
  Answer,
  Score,
} = require("../../models");

const renderDashboardPage = async (req, res) => {
  try {
    const { userId } = req.session;
    const quizzes = await Quiz.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const formattedQuizzes = quizzes.map((quiz) => quiz.get({ plain: true }));
    res.render("dashboard", { formattedQuizzes });
  } catch (error) {
    console.log(error, "Not working");
  }
};

const renderMainQuizPage = async (req, res) => {
  try {
    const allQuizzes = await Quiz.findAll({
      include: [
        // In the JSON it returns it will include username of the creator of the quiz
        { model: User, attributes: ["username"] },
        { model: Category, attributes: ["category_name"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    // Getting a plain version of the JSON data (just data we inputted)
    const formattedQuizzes = allQuizzes
      .map((quiz) => quiz.get({ plain: true }))
      .slice(0, 8);

    res.render("quizzes", { formattedQuizzes });
  } catch (err) {
    console.error(err);
  }
};

const renderCreateQuizPage = async (req, res) => {
  res.render("create-quiz");
};

const renderCreateQuestionPage = async (req, res) => {
  res.render("create-quiz-questions");
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const renderQuizPageById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByPk(id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Category, attributes: ["category_name"] },
        {
          model: Question,
          attributes: ["question", "correct_option"],
          include: { model: Answer },
        },
        { model: Score, include: { model: User, attributes: ["username"] } },
      ],
    });

    // console.log(quiz)

    const plainQuiz = quiz.get({ plain: true });

    const questions = plainQuiz.questions.map((question) => {
      const { answers } = question;

      const { option } = answers[0];

      const options = JSON.parse(option);

      const shuffledAnswers = shuffleArray(options);

      question.answers = shuffledAnswers;

      return question;
    });

    const x = {
      ...plainQuiz,
      questions,
    };

    console.log("x", JSON.stringify(x, null, 2));

    res.render("individual-quiz", x);
  } catch (error) {
    console.log(error.message);
  }
};

const renderSearchedQuizzes = async (req, res) => {
  try {
    const { title, category_id } = req.query;

    let searchTerm;
    let columnName;

    if (title) {
      searchTerm = title;
      columnName = "title";
    } else {
      searchTerm = category_id;
      columnName = "category_id";
    }

    const quizzes = await Quiz.findAll({
      where: {
        [columnName]: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      include: [
        { model: User, attributes: ["username"] },
        { model: Category, attributes: ["category_name"] },
      ],
    });

    const formattedQuizzes = quizzes.map((quiz) => quiz.get({ plain: true }));

    res.render("quizzes", { formattedQuizzes });
  } catch (err) {
    console.error(err);
  }
};
const renderGenerateQuiz = async (req, res) => {
  try {
    const { title, category, difficulty } = req.query;
    const { userId } = req.session;
    const params = { category, difficulty, amount: 10, type: "multiple" };
    const apiQuestions = await getApiQuestions(params);

    const quiz = await Quiz.create({
      title,
      category_id: category,
      difficulty,
      user_id: userId,
    });

    const questions = apiQuestions.map((question) => {
      return {
        question: question.question,
        correct_option: question.correct_answer,
        quiz_id: quiz.id,
      };
    });

    const dbQuestions = await Question.bulkCreate(questions);

    const answers = apiQuestions.map((question, index) => {
      return {
        option: JSON.stringify([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
        question_id: dbQuestions[index].id,
      };
    });

    await Answer.bulkCreate(answers);
    res.redirect("/quiz");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  renderDashboardPage,
  renderMainQuizPage,
  renderQuizPageById,
  renderCreateQuizPage,
  renderCreateQuestionPage,
  renderSearchedQuizzes,
  renderGenerateQuiz,
};
