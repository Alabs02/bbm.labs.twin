"use strict";

// const { faker } = require("@faker-js/faker");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("prop_firms", [
			{
				id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				name: "Next Step Funded",
				account_sizes: JSON.stringify({
					15000: 125,
					25000: 179,
					50000: 359,
					100000: 602,
					200000: 1205,
				}),
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("prop_firms", null, {});
	},
};
