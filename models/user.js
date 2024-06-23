"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// Add associations here if needed
		}
	}

	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			firstname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			location: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			ip_address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			last_login: {
				type: DataTypes.DATE,
			},
			last_logout: {
				type: DataTypes.DATE,
			},
			email_verified_at: {
				type: DataTypes.DATE,
			},
			verification_code: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			verification_code_expires_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			remember_token: {
				type: DataTypes.STRING,
			},
			reset_token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			reset_token_expires: {
				type: DataTypes.DATE,
				allowNull: true,
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
			modelName: "User",
			tableName: "users",
		},
	);

	return User;
};
