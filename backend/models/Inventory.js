import { Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const Inventory = sequelize.define(
  "Inventory",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "inventory",
  }
);

export default Inventory;
