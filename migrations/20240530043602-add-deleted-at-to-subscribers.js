"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("subscribers", "deleted_at", {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("subscribers", "deleted_at");
	},
};
