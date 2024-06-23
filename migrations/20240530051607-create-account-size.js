"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("account_sizes", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			size: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			fee: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			prop_firm_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "prop_firms",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deleted_at: {
				type: Sequelize.DATE,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("account_sizes");
	},
};
