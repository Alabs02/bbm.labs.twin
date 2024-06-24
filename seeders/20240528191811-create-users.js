"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

module.exports = {
	async up(queryInterface, Sequelize) {
		const users = [];
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash("password123", salt);

		users.push({
			id: "b862da4c-1900-4401-9929-da69fffeaec6",
			firstname: faker.person.firstName(),
			lastname: faker.person.lastName(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			location: faker.location.city(),
			ip_address: faker.internet.ip(),
			password: hashedPassword,
			is_active: faker.datatype.boolean(),
			last_login: faker.date.past(),
			last_logout: faker.date.past(),
			email_verified_at: faker.date.past(),
			remember_token: faker.string.uuid(),
			created_at: new Date(),
			updated_at: new Date(),
		});

		for (let i = 0; i < 9; i++) {
			users.push({
				id: faker.string.uuid(),
				firstname: faker.person.firstName(),
				lastname: faker.person.lastName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				location: faker.location.city(),
				ip_address: faker.internet.ip(),
				password: hashedPassword,
				is_active: faker.datatype.boolean(),
				last_login: faker.date.past(),
				last_logout: faker.date.past(),
				email_verified_at: faker.date.past(),
				remember_token: faker.string.uuid(),
				created_at: new Date(),
				updated_at: new Date(),
			});
		}

		await queryInterface.bulkInsert("users", users, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
