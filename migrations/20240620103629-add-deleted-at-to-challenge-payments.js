"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("challenge_payments", "deleted_at", {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("challenge_payments", "deleted_at");
	},
};
