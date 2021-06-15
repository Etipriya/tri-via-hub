const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  option: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },

  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "question",
      key: "id",
    },
  },
};

const options = {
  sequelize,
  modelName: "answer",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

class Answer extends Model {}

Answer.init(schema, options);

module.exports = Answer;
