"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("account_sizes", [
			{
				id: faker.string.uuid(),
				size: 5000,
				fee: 120,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24", // Replace with actual prop_firm_id after creating prop_firms
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: faker.string.uuid(),
				size: 10000,
				fee: 120,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: faker.string.uuid(),
				size: 15000,
				fee: 120,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: "be985089-3f9b-46a5-8ab0-753d3f7f6db5",
				size: 25000,
				fee: 120,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: faker.string.uuid(),
				size: 50000,
				fee: 120,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: faker.string.uuid(),
				size: 100000,
				fee: 200,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: faker.string.uuid(),
				size: 200000,
				fee: 200,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: faker.string.uuid(),
				size: 300000,
				fee: 200,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: faker.string.uuid(),
				size: 400000,
				fee: 200,
				prop_firm_id: "3318ad9b-cb9d-4f59-9da7-3d9be0a1af24",
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("account_sizes", null, {});
	},
};
