const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("question", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        question: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};
