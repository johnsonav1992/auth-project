const { DataTypes } = require('sequelize')

const sequelize = require('../util/database')

module.exports = {
	User: sequelize.define({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		username: DataTypes.STRING,
		hashedPass: DataTypes.STRING,
	})
}
