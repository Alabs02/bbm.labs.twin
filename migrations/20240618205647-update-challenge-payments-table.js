"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn("challenge_payments", "challenge_id");
		await queryInterface.removeColumn("challenge_payments", "paid_at");
		await queryInterface.addColumn("challenge_payments", "payment_initializations_id", {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: "payment_initializations", // Name of the target table
				key: "id", // Key in the target table
			},
		});
		await queryInterface.addColumn("challenge_payments", "admin_payment_confirmation_status", {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "pending", // Default status
		});
		await queryInterface.addColumn("challenge_payments", "admin_username", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("challenge_payments", "payment_confirmed_at", {
			type: Sequelize.DATE,
			allowNull: true,
		});
		// await queryInterface.removeColumn('challenge_payments', 'admin_payment_confirmation');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn("challenge_payments", "user_id", {
			type: Sequelize.UUID,
			allowNull: false,
		});
		await queryInterface.addColumn("challenge_payments", "challenge_id", {
			type: Sequelize.UUID,
			allowNull: false,
		});
		await queryInterface.addColumn("challenge_payments", "paid_at", {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		});
		await queryInterface.removeColumn("challenge_payments", "payment_initializations_id");
		await queryInterface.removeColumn("challenge_payments", "admin_username");
		await queryInterface.removeColumn("challenge_payments", "payment_confirmed_at");
		await queryInterface.removeColumn("challenge_payments", "admin_payment_confirmation_status");
	},
};
