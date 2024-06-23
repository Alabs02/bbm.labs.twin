const db = require("../models/index.js");
const { validationResult } = require("express-validator");
const { responseSerializer } = require("../helpers/index.js");

const ChallengeController = {
	index: async (req, res) => {
		try {
			const challenges = await db.Challenge.findAll({ where: { userId: req.params.userId } });
			res.json(responseSerializer.format(true, "Challenges fetched successfully", challenges));
		} catch (error) {
			console.error(error);
			res.status(500).json(responseSerializer.format(false, "Internal server error"));
		}
	},

	store: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json(responseSerializer.format(false, "Validation error", null, errors.array()));
		}

		try {
			const challenge = await db.Challenge.create(req.body);
			res
				.status(201)
				.json(responseSerializer.format(true, "Challenge created successfully", challenge));
		} catch (error) {
			console.error(error);
			res.status(500).json(responseSerializer.format(false, "Internal server error"));
		}
	},

	update: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json(responseSerializer.format(false, "Validation error", null, errors.array()));
		}

		try {
			const challenge = await db.Challenge.findByPk(req.params.id);
			if (!challenge) {
				return res.status(404).json(responseSerializer.format(false, "Challenge not found"));
			}
			await challenge.update(req.body);
			res.json(responseSerializer.format(true, "Challenge updated successfully", challenge));
		} catch (error) {
			console.error(error);
			res.status(500).json(responseSerializer.format(false, "Internal server error"));
		}
	},

	markLive: async (req, res) => {
		try {
			// Mark account as live logic here
			res.json(responseSerializer.format(true, "Account marked as live"));
		} catch (error) {
			console.error(error);
			res.status(500).json(responseSerializer.format(false, "Internal server error"));
		}
	},
};

module.exports = ChallengeController;
