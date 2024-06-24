"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
	async up(queryInterface, Sequelize) {
		const platforms = ["BBM", "BBM Ace", "BBM Capitalis"];
		const subscribers = [];

		for (let i = 0; i < 10; i++) {
			subscribers.push({
				id: faker.string.uuid(),
				email: faker.internet.email(),
				platform: platforms[Math.floor(Math.random() * platforms.length)],
				created_at: new Date(),
				updated_at: new Date(),
			});
		}

		await queryInterface.bulkInsert("subscribers", subscribers, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("subscribers", null, {});
	},
};
