const User = require("./user");
const Quiz = require("./quiz");
const Question = require("./question");
const Answer = require("./answer");
const Score = require("./score");

User.hasMany(Quiz, {
  foreignKey: "user_id",
});

User.hasMany(Score, {
  foreignKey: "user_id",
});

Quiz.hasMany(Score, {
  foreignKey: "quiz_id",
});

Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
});

Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});

Question.hasMany(Answer, {
  foreignKey: "question_id",
});

Quiz.belongsTo(User, {
  foreignKey: "user_id",
});

Score.belongsTo(User, {
  foreignKey: "user_id",
});
Score.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
});

module.exports = { User, Quiz, Question, Answer, Score };
