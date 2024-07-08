const express = require("express");
const LookupController = require("../controllers/LookupController.js");

const router = express.Router();

router.get("/ip-details", LookupController.getIpDetails);
router.get("/", LookupController.getIpAPIInfo);
router.get(
	"/check-email-verification-status/:userId",
	LookupController.getUserEmailVerificationStatus,
);
router.get('/check-user-challenges/:userId', LookupController.checkUserChallenges);
router.get("/check-username-availability", LookupController.checkUsernameAvailability);
router.get('/check-recent-payment-initialization/:userId', LookupController.checkRecentPaymentInitialization);

module.exports = router;
