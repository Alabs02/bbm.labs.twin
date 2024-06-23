"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Subscriber extends Model {
		static associate(models) {
			// Add associations here if needed
		}
	}

	Subscriber.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			platform: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			deleted_at: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			paranoid: true,
			timestamps: true,
			underscored: true,
			modelName: "Subscriber",
			tableName: "subscribers",
		},
	);

	return Subscriber;
};
