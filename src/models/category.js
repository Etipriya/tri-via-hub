const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

const schema = {
  api_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 50],
    },
  },
};

const options = {
  sequelize,
  modelName: "category",
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

class Category extends Model {}

Category.init(schema, options);

module.exports = Category;
