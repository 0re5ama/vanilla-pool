// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
	sequelize.define('player', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
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
