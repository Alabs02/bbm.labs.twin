"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("challenges", "deleted_at", {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("challenges", "deleted_at");
	},
};
