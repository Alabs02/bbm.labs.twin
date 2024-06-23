"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("payment_initializations", "order_code", {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("payment_initializations", "order_code");
	},
};
