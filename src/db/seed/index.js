require("dotenv").config();
const sequelize = require("../../config/connection");
const { User, Quiz, Question, Answer, Score } = require("../../models");
const users = require("./data/users.json");
const quizzes = require("./data/quizzes.json");
const questions = require("./data/questions.json");
const answers = require("./data/answers.json");
const scores = require("./data/scores.json");

const seed = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(users);
  console.log("Successfully seeded users");

  await Quiz.bulkCreate(quizzes);
  console.log("Successfully seeded quizzes");

  await Question.bulkCreate(questions);
  console.log("Successfully seeded questions");

  await Answer.bulkCreate(answers);
  console.log("Successfully seeded answers");

  await Score.bulkCreate(scores);
  console.log("Successfully seeded scores");

  process.exit(0);
};

seed();
