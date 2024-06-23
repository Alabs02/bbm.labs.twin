// models/contact.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Contact extends Model {
		static associate(models) {
			// Add associations here if needed
		}
	}

	Contact.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			fullname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			subject: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			message: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			platform: {
				type: DataTypes.ENUM("BBM", "BBM Ace", "BBM Capitalis"),
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
			modelName: "Contact",
			tableName: "contacts",
		},
	);

	return Contact;
};
