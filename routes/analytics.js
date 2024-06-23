const express = require("express");
const { AnalyticsController } = require("../controllers/index.js");

const router = express.Router();

router.get("/pending-challenges/:userId", AnalyticsController.getTotalPendingChallenges);
router.get("/passed-challenges/:userId", AnalyticsController.getTotalPassedChallenges);
router.get("/failed-challenges/:userId", AnalyticsController.getTotalFailedChallenges);
router.get(
	"/challenge-payment-history/:userId",
	AnalyticsController.getUserChallengePaymentHistory,
);

module.exports = router;
