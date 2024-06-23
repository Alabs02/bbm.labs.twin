"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("payment_initializations", "payment_confirmation_time", {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("payment_initializations", "payment_confirmation_time");
	},
};
