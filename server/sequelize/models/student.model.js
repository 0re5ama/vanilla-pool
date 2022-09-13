const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("student", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        fName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        mName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        lName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        roll: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        zoomId: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};
