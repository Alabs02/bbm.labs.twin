const db = require("../models/index.js");
const { validationResult } = require("express-validator");
const { responseSerializer } = require("../helpers/index.js");

const challengePaymentController = {
	store: async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json(responseSerializer.format(false, "Validation error", null, errors.array()));
		}

		try {
			const challengePayment = await db.ChallengePayment.create(req.body);
			res
				.status(201)
				.json(
					responseSerializer.format(
						true,
						"Challenge payment created successfully",
						challengePayment,
					),
				);
		} catch (error) {
			console.error(error);
			res.status(500).json(responseSerializer.format(false, "Internal server error"));
		}
	},
};

module.exports = challengePaymentController;
