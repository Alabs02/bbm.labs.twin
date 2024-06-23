"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"challenges",
			[
				{
					id: "0eb1d182-161c-45a5-9f16-2636239d8b34",
					user_id: "b862da4c-1900-4401-9929-da69fffeaec6",
					account_size_id: "be985089-3f9b-46a5-8ab0-753d3f7f6db5",
					status: "pending",
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("challenges", null, {});
	},
};
