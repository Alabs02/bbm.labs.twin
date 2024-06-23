"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("challenges", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			user_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			account_size_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "account_sizes",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			status: {
				allowNull: false,
				type: Sequelize.ENUM("pending", "pass", "fail"),
				defaultValue: "pending",
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("challenges");
	},
};
