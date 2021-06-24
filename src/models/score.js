const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
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
  modelName: "score",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

class Score extends Model {}

Score.init(schema, options);

module.exports = Score;
