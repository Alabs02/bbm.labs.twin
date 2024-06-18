const authRoutes = require("./auth.js");
const lookupRoutes = require("./lookup.js");
const paymentRoutes = require("./payment.js");
const contactRoutes = require("./contact.js");
const propFirmRoutes = require("./propFirm.js");
const challengeRoutes = require("./challenge.js");
const newsletterRoutes = require("./newsletter.js");
const accountSizeRoutes = require("./accountSize.js");

module.exports = {
	authRoutes,
	lookupRoutes,
	contactRoutes,
  paymentRoutes,
	propFirmRoutes,
  challengeRoutes,
	newsletterRoutes,
	accountSizeRoutes,
};
