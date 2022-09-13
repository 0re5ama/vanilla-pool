const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("session", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        date: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};
