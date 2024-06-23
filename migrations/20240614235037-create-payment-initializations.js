"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("payment_initializations", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			user_id: {
				allowNull: false,
				type: Sequelize.UUID,
			},
			step_id: {
				type: Sequelize.STRING,
			},
			step_label: {
				type: Sequelize.STRING,
			},
			step_code: {
				type: Sequelize.STRING,
			},
			currency_type_id: {
				type: Sequelize.STRING,
			},
			account_size_id: {
				type: Sequelize.STRING,
			},
			network_id: {
				type: Sequelize.STRING,
			},
			network_label: {
				type: Sequelize.STRING,
			},
			total_payable_amount: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},
			has_agreed_to_terms: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			payment_token: {
				allowNull: false,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				unique: true,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			expires_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("payment_initializations");
	},
};
