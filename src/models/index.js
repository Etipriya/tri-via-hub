const User = require("./user");
const Quiz = require("./quiz");
const Question = require("./question");
const Answer = require("./answer");
const Score = require("./score");
const Favourite = require("./favourite");
const Category = require("./category");

User.hasMany(Quiz, {
  foreignKey: "user_id",
});

User.hasMany(Score, {
  foreignKey: "user_id",
});

User.hasMany(Favourite, {
  foreignKey: "user_id",
});

Quiz.hasMany(Score, {
  foreignKey: "quiz_id",
});

Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
});

Quiz.hasMany(Favourite, {
  foreignKey: "fav_quiz_id",
});

Question.hasMany(Answer, {
  foreignKey: "question_id",
});

Category.hasMany(Quiz, {
  foreignKey: "category_id",
});

Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});

Quiz.belongsTo(User, {
  foreignKey: "user_id",
});

Quiz.belongsTo(Category, {
  foreignKey: "category_id",
});

Score.belongsTo(User, {
  foreignKey: "user_id",
});
Score.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});

Favourite.belongsTo(User, {
  foreignKey: "user_id",
});

Favourite.belongsTo(Quiz, {
  foreignKey: "fav_quiz_id",
});

Answer.belongsTo(Question, {
  foreignKey: "question_id",
});

module.exports = { User, Quiz, Question, Answer, Score, Favourite, Category };
