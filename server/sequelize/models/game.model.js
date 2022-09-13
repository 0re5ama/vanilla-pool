// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
	sequelize.define('game', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		grp: {
			allowNull: false,
			type: DataTypes.STRING
		},
	});
};
