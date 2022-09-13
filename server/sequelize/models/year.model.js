const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("year", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        year: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};
