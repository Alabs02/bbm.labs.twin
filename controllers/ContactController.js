const path = require("path");
const db = require("../models/index.js");
const { validationResult } = require("express-validator");
const { responseSerializer } = require("../helpers/index.js");
const { EmailService, ETEMPLATES } = require("../services/email.service.js");

const emailService = new EmailService(
	"notifications@bullbearmastery.com",
	process.env.EMAIL_NOTIFICATIONS_KEY,
	path.join(__dirname, "../templates"),
);

const ContactController = {
	async contactUs(req, res) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json(
					responseSerializer.format(
						false,
						"Validation unsuccessful. Please check your input and try again.",
						null,
						errors.array(),
					),
				);
		}

		const { fullname, email, phone_number, subject, message, platform } = req.body;

		try {
			// Save contact information to the database if needed
			await db.Contact.create({
				fullname,
				email,
				phone_number,
				subject,
				message,
				platform,
			});

			// Send email to support
			await emailService.sendEmail(
				"support@bullbearmastery.com",
				ETEMPLATES.CONTACT_US,
				`New Contact Us message from ${platform}`,
				{ fullname, email, phone_number, subject, message, platform },
			);

			return res
				.status(201)
				.json(
					responseSerializer.format(
						true,
						"Your message has been received. We will get back to you shortly.",
					),
				);
		} catch (error) {
			console.error("Error in contactUs:", error);
			return res
				.status(500)
				.json(
					responseSerializer.format(
						false,
						"Failed to send your message. Please try again or contact support for assistance.",
						null,
						[{ msg: error.message }],
					),
				);
		}
	},
};

module.exports = ContactController;
