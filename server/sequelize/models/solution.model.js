const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("solution", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        solution: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};
