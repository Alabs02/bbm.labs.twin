"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"challenge_payments",
			[
				{
					id: "58f29635-8720-4998-9384-c2a38c3cbb53",
					user_id: "b862da4c-1900-4401-9929-da69fffeaec6",
					challenge_id: "0eb1d182-161c-45a5-9f16-2636239d8b34",
					amount: 15000,
					paid_at: new Date(),
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("challenge_payments", null, {});
	},
};
