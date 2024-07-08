"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Challenge extends Model {
		static associate(models) {
			// this.belongsTo(models.User, { foreignKey: "user_id" });
			this.belongsTo(models.ChallengePayment, { foreignKey: "challenge_payment_id" });
		}
	}

	Challenge.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			challenge_payment_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM("pending", "pass", "fail"),
				defaultValue: "pending",
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
      deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			paranoid: true,
			timestamps: true,
			underscored: true,
			modelName: "Challenge",
			tableName: "challenges",
		},
	);

	return Challenge;
};
