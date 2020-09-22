const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = new Sequelize("../lib/seqlize");

class Message extends Model {}
Message.init(
  {
    messages: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    ts: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  },
  { sequelize, modelName: "Message" }
);

Message.sync();

module.exports = Message;
