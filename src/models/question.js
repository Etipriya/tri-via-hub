const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 50],
    },
  },
  correct_option: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "quiz",
      key: "id",
    },
  },
};

const options = {
  sequelize,
  modelName: "question",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

class Question extends Model {}

Question.init(schema, options);

module.exports = Question;
