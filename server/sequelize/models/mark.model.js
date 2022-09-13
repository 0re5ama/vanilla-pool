const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("mark", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        marks: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    });
};
