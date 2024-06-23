const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const ETEMPLATES = {
	CONTACT_US: "contact_us",
	WELCOME_EMAIL: "welcome_email",
  FAILED_PAYMENT: "failed_payment",
  PENDING_PAYMENT: "pending_payment",
	FORGOT_PASSWORD: "forgot_password",
	EMAIL_VERIFICATION: "email_verification",
	PAYMENT_CONFIRMATION: "payment_confirmation",
};

class EmailService {
	constructor(user, pass, templateDir) {
		this.user = user;
		this.pass = pass;
		this.templateDir = templateDir;

		this.transporter = nodemailer.createTransport({
			host: "smtp.zoho.eu",
			port: 465,
			secure: true,
			auth: {
				user: this.user,
				pass: this.pass,
			},
		});
	}

	async sendEmail(to, template, subject, context) {
		const templatePath = path.join(this.templateDir, `${template}.hbs`);
		const html = await this.renderTemplate(templatePath, context);

		const mailOptions = {
			from: this.user,
			to,
			subject,
			html,
		};

		return this.transporter.sendMail(mailOptions);
	}

	async renderTemplate(templatePath, context) {
		const source = fs.readFileSync(templatePath, "utf8");
		const template = handlebars.compile(source);
		return template(context);
	}
}

module.exports = {
	ETEMPLATES,
	EmailService,
};
