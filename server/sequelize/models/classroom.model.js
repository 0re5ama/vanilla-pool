const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("classroom", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        className: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};
