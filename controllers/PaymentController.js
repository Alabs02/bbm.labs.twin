const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const db = require("../models/index.js");
const path = require("path");
const { responseSerializer } = require("../helpers/index.js");
const { EmailService, ETEMPLATES } = require("../services/email.service.js");
const capitalize = require("lodash/capitalize.js");
const isEmpty = require("lodash/isEmpty.js");

// EMAIL SERVICE INSTANCES
const emailNotificationService = new EmailService(
	"notifications@bullbearmastery.com",
	process.env.EMAIL_NOTIFICATIONS_KEY,
	path.join(__dirname, "../templates"),
);

const generateUniqueOrderCode = async () => {
	let orderCode;
	let isUnique = false;

	while (!isUnique) {
		orderCode = Math.floor(100000 + Math.random() * 900000).toString();
		const existingOrder = await db.PaymentInitialization.findOne({
			where: { order_code: orderCode },
		});
		if (!existingOrder) {
			isUnique = true;
		}
	}

	return orderCode;
};

const accountSizes = [
  {
    id: "1",
    amount: 7500,
    shortAmount: "7.5k",
    cost: 71,
    challengeCharge: 120
  },
  {
    id: "2",
    amount: 1500,
    shortAmount: "15k",
    cost: 140,
    challengeCharge: 120
  },
  {
    id: "3",
    amount: 2500,
    shortAmount: "25k",
    cost: 220,
    challengeCharge: 120
  },
  {
    id: "4",
    amount: 50000,
    shortAmount: "50k",
    cost: 440,
    challengeCharge: 120
  },
  {
    id: "5",
    amount: 100000,
    shortAmount: "100k",
    cost: 890,
    challengeCharge: 200
  },
  {
    id: "6",
    amount: 300000,
    shortAmount: "300k",
    cost: 2150,
    challengeCharge: 200
  }
];

const propFirmName = "Next Step Funded";

const PaymentController = {
	async initializePayment(req, res) {
		const {
			userId,
			stepId,
			stepLabel,
			stepCode,
			currencyTypeId,
			accountSizeId,
			networkId,
			networkLabel,
			totalPayableAmount,
			hasAgreedToTerms,
		} = req.body;

		try {
			const paymentToken = uuidv4();
			const expirationAt = new Date(Date.now() + 20 * 60 * 1000);
			const orderCode = await generateUniqueOrderCode();

			const payment = await db.PaymentInitialization.create({
				user_id: userId,
				step_id: stepId,
				step_label: stepLabel,
				step_code: stepCode,
				currency_type_id: currencyTypeId,
				account_size_id: accountSizeId,
				network_id: networkId,
				network_label: networkLabel,
				total_payable_amount: totalPayableAmount,
				has_agreed_to_terms: hasAgreedToTerms,
				payment_token: paymentToken,
				expires_at: expirationAt,
				order_code: orderCode,
			});

			const response = {
				...payment.toJSON(),
				wallet_address: process.env.BYBIT_TRC20_WALLET_ADDRESS,
			};

			return res
				.status(201)
				.json(responseSerializer.format(true, "Payment initialization successful", response));
		} catch (error) {
			console.error("Error initializing payment:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal server error", null, [{ msg: error.message }]),
				);
		}
	},

	async checkValidity(req, res) {
		const { orderCodeOrPaymentToken } = req.params;

		try {
			const payment = await db.PaymentInitialization.findOne({
				where: {
					[Op.or]: [
						{ order_code: orderCodeOrPaymentToken },
						{ payment_token: orderCodeOrPaymentToken },
					],
				},
			});

			if (!payment) {
				return res
					.status(404)
					.json(responseSerializer.format(false, "Payment initialization not found", null));
			}

			const isValid = payment.expires_at > new Date();

			return res
				.status(200)
				.json(
					responseSerializer.format(true, "Payment initialization validity checked", { isValid }),
				);
		} catch (error) {
			console.error("Error checking payment validity:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal server error", null, [{ msg: error.message }]),
				);
		}
	},

	async getInitialization(req, res) {
		const { orderCodeOrPaymentToken } = req.params;

		try {
			const payment = await db.PaymentInitialization.findOne({
				where: {
					[Op.or]: [
						{ order_code: orderCodeOrPaymentToken },
						{ payment_token: orderCodeOrPaymentToken },
					],
				},
			});

			if (!payment) {
				return res
					.status(404)
					.json(responseSerializer.format(false, "Payment initialization not found", null));
			}

			return res
				.status(200)
				.json(
					responseSerializer.format(
						true,
						"Payment initialization fetched successfully",
						payment.toJSON(),
					),
				);
		} catch (error) {
			console.error("Error fetching payment initialization:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal server error", null, [{ msg: error.message }]),
				);
		}
	},

	async confirmPayment(req, res) {
		const { orderCodeOrPaymentToken } = req.params;
		const { email, firstname, lastname, username } = req.body; // Assume additional details are provided in the request body
		
    try {
			const payment = await db.PaymentInitialization.findOne({
				where: {
					[Op.or]: [
						{ order_code: orderCodeOrPaymentToken },
						{ payment_token: orderCodeOrPaymentToken },
					],
				},
			});

			if (!payment) {
				return res
					.status(404)
					.json(responseSerializer.format(false, "Payment initialization not found."));
			}

      let accountSize = 0;
      const accountDetails = accountSizes.find((o) => Number(o.id) === Number(payment.account_size_id));

      if (!isEmpty(accountDetails)) {
        accountSize = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(accountDetails.amount);
      }

			const totalCost = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(payment.total_payable_amount);


			// Update the payment confirmation status and time
			await payment.update({ payment_confirmed: true, payment_confirmation_time: new Date() });

			// Send pending payment email
			await emailNotificationService.sendEmail(
				email,
				ETEMPLATES.PENDING_PAYMENT,
				"Action Required: Complete Your Payment for Next Step Funded Challenge",
				{ username: capitalize(username), propFirmName, accountSize, totalCost },
			);

			return res
				.status(200)
				.json(
					responseSerializer.format(
						true,
						"Payment confirmed. Please wait for 10 minutes for confirmation.",
						payment,
					),
				);
		} catch (error) {
			console.error("Error in confirmPayment:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal error. Please contact support.", null, [
						{ msg: error.message },
					]),
				);
		}
	},

	async adminConfirmPayment(req, res) {
		const { payment_initializations_id, status, adminUsername } = req.body;

		// Validate the status
		if (!["pending", "failed", "completed"].includes(status)) {
			return res.status(400).json(responseSerializer.format(false, "Invalid status provided."));
		}

		try {
			// Find the PaymentInitialization record based on the provided ID
			const paymentInitialization = await db.PaymentInitialization.findOne({
				where: { id: payment_initializations_id },
			});

			// If no record is found, return a 404 error
			if (!paymentInitialization) {
				return res
					.status(404)
					.json(responseSerializer.format(false, "Payment initialization not found."));
			}

			// Find or create the ChallengePayment record associated with the PaymentInitialization
			let challengePayment = await db.ChallengePayment.findOne({
				where: { payment_initializations_id },
			});

			// If no ChallengePayment record is found, create a new one
			if (!challengePayment) {
				challengePayment = await db.ChallengePayment.create({
					user_id: paymentInitialization.user_id,
					payment_initializations_id,
					amount: paymentInitialization.total_payable_amount,
					admin_payment_confirmation_status: status,
					admin_username: adminUsername,
					payment_confirmed_at: ["completed", "failed"].includes(status) ? new Date() : null,
				});
			} else {
				// Update the existing ChallengePayment record with the new status, admin username, and payment confirmation time
				await challengePayment.update({
					admin_payment_confirmation_status: status,
					admin_username: adminUsername,
					payment_confirmed_at: ["completed", "failed"].includes(status) ? new Date() : null,
				});
			}


      let accountSize = 0;
      const accountDetails = accountSizes.find((o) => Number(o.id) === Number(paymentInitialization.account_size_id));

      if (!isEmpty(accountDetails)) {
        accountSize = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(accountDetails.amount);
      }

			const totalCost = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(paymentInitialization.total_payable_amount);

			// If the status is 'completed', proceed with further actions
			const user = await db.User.findOne({ where: { id: challengePayment.user_id } });
			const { email, username } = user;
			const dashboardLink = process.env.CLIENT_DASHBOARD_URI;

			if (status === "completed") {
				// Send a confirmation email to the user
				await emailNotificationService.sendEmail(
					email,
					ETEMPLATES.PAYMENT_CONFIRMATION,
          `Funding Secured, ${capitalize(username)}! Get Ready to Conquer Your Challenge`,
					{
						username: capitalize(username),
						propFirmName,
						accountSize,
						totalCost,
						dashboardLink,
					},
				);

				// Create a new Challenge record associated with the ChallengePayment
				await db.Challenge.create({
					challenge_payment_id: challengePayment.id,
					status: "pending",
				});
			} else if (status === "failed") {
				// Send a failed payment email to the user
				await emailNotificationService.sendEmail(
					email,
					ETEMPLATES.FAILED_PAYMENT,
					"Important: Payment Required to Start Your Next Step Funded Challenge",
					{
						username: capitalize(username),
						propFirmName,
						accountSize,
						totalCost,
						dashboardLink,
					},
				);
			}

			// Return a success response with the updated or created ChallengePayment record
			return res
				.status(200)
				.json(
					responseSerializer.format(
						true,
						"Payment confirmation status updated successfully.",
						challengePayment,
					),
				);
		} catch (error) {
			// Log any errors and return a 500 internal server error response
			console.error("Error in adminConfirmPayment:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(false, "Internal error. Please contact support.", null, [
						{ msg: error.message },
					]),
				);
		}
	},
};

module.exports = PaymentController;
