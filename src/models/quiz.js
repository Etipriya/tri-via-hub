const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 50],
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "category",
      key: "api_id",
    },
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,

    validate: {
      len: [2, 50],
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,

    validate: {
      len: [2, 50],
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
};

const options = {
  sequelize,
  modelName: "quiz",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

// will go in util function

class Quiz extends Model {
  parseAnswers() {
    return {
      ...this,
      questions,
    };
  }
}

Quiz.init(schema, options);

module.exports = Quiz;
