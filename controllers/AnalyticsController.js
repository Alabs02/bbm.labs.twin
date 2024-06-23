const db = require("../models");
const { Op } = require("sequelize");
const { responseSerializer } = require("../helpers/index.js");

const AnalyticsController = {
	async getTotalPendingChallenges(req, res) {
		const { userId } = req.params;

		try {
			const count = await db.Challenge.count({
				include: [
					{
						model: db.ChallengePayment,
						where: { user_id: userId },
					},
				],
				where: {
					status: "pending",
				},
			});

			return res
				.status(200)
				.json(
					responseSerializer.format(true, "Total pending challenges retrieved successfully.", {
						count,
					}),
				);
		} catch (error) {
			console.error("Error in getTotalPendingChallenges:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal error. Please contact support.", null, [
						{ msg: error.message },
					]),
				);
		}
	},

	// Endpoint to get the total count of passed challenges for a specific user
	async getTotalPassedChallenges(req, res) {
		const { userId } = req.params;

		try {
			const count = await db.Challenge.count({
				include: [
					{
						model: db.ChallengePayment,
						where: { user_id: userId },
					},
				],
				where: {
					status: "pass",
				},
			});

			return res
				.status(200)
				.json(
					responseSerializer.format(true, "Total passed challenges retrieved successfully.", {
						count,
					}),
				);
		} catch (error) {
			console.error("Error in getTotalPassedChallenges:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal error. Please contact support.", null, [
						{ msg: error.message },
					]),
				);
		}
	},

	// Endpoint to get the total count of failed challenges for a specific user
	async getTotalFailedChallenges(req, res) {
		const { userId } = req.params;

		try {
			const count = await db.Challenge.count({
				include: [
					{
						model: db.ChallengePayment,
						where: { user_id: userId },
					},
				],
				where: {
					status: "fail",
				},
			});

			return res
				.status(200)
				.json(
					responseSerializer.format(true, "Total failed challenges retrieved successfully.", {
						count,
					}),
				);
		} catch (error) {
			console.error("Error in getTotalFailedChallenges:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal error. Please contact support.", null, [
						{ msg: error.message },
					]),
				);
		}
	},

	// Endpoint to get a paginated list of all user challenge payment history
	async getUserChallengePaymentHistory(req, res) {
		const { userId } = req.params;
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;

		try {
			const challengePayments = await db.ChallengePayment.findAndCountAll({
				where: { user_id: userId },
				limit: parseInt(limit),
				offset: parseInt(offset),
				order: [["created_at", "DESC"]],
				include: [
					{
						model: db.Challenge,
						attributes: ["status"],
					},
				],
			});

			const totalPages = Math.ceil(challengePayments.count / limit);

			return res.status(200).json(
				responseSerializer.format(true, "User challenge payment history retrieved successfully.", {
					challengePayments: challengePayments.rows,
					pagination: {
						totalItems: challengePayments.count,
						totalPages,
						currentPage: parseInt(page),
					},
				}),
			);
		} catch (error) {
			console.error("Error in getUserChallengePaymentHistory:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal error. Please contact support.", null, [
						{ msg: error.message },
					]),
				);
		}
	}
}

module.exports = AnalyticsController;
