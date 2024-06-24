const express = require("express");
const LookupController = require("../controllers/LookupController.js");

const router = express.Router();

router.get("/ip-details", LookupController.getIpDetails);
router.get("/", LookupController.getIpAPIInfo);
router.get(
	"/check-email-verification-status/:userId",
	LookupController.getUserEmailVerificationStatus,
);
router.get("/check-username-availability", LookupController.checkUsernameAvailability);

module.exports = router;
