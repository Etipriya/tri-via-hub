const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 20],
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 20],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 20],
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const options = {
  sequelize,
  modelName: "user",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

class User extends Model {}

User.init(schema, options);

module.exports = User;
