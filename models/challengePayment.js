"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ChallengePayment extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: "user_id" });
			this.hasMany(models.Challenge, { foreignKey: "challenge_payment_id" });
		}
	}

	ChallengePayment.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			payment_initializations_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			admin_payment_confirmation_status: {
				type: DataTypes.ENUM("pending", "failed", "completed"),
				defaultValue: "pending",
			},
			admin_username: {
				type: DataTypes.STRING,
			},
			payment_confirmed_at: {
				type: DataTypes.DATE,
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
			modelName: "ChallengePayment",
			tableName: "challenge_payments",
		},
	);

	return ChallengePayment;
};
