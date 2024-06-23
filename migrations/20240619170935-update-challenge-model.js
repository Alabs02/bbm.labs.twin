"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn("challenges", "user_id");
		await queryInterface.removeColumn("challenges", "account_size_id");
		await queryInterface.addColumn("challenges", "challenge_payment_id", {
			type: Sequelize.UUID,
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn("challenges", "user_id", {
			type: Sequelize.UUID,
			allowNull: false,
		});
		await queryInterface.addColumn("challenges", "account_size_id", {
			type: Sequelize.UUID,
			allowNull: false,
		});
		await queryInterface.removeColumn("challenges", "challenge_payment_id");
	},
};
