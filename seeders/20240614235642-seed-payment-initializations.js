// seeders/20230614123456-payment-initializations.js
"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"payment-initializations",
			[
				{
					id: faker.string.uuid(),
					user_id: "ebeb5492-e6d6-4327-83f7-d64031a42813",
					step_id: faker.string.uuid(),
					step_label: "Sample Step",
					step_code: "SS001",
					currency_type_id: faker.string.uuid(),
					account_size_id: faker.string.uuid(),
					network_id: faker.string.uuid(),
					network_label: "Sample Network",
					total_payable_amount: 100.0,
					has_agreed_to_terms: true,
					payment_token: faker.string.uuid(),
					expiration_time: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes from now
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("payment-initializations", null, {});
	},
};
