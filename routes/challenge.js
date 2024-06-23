const express = require("express");
const router = express.Router();
const { challengeValidationRules } = require("../validators/index.js");
const { ChallengeController, ChallengePaymentController } = require("../controllers/index.js");

router.put("/mark-live", ChallengeController.markLive);
router.get("/users/:userId/all", ChallengeController.index);
router.post("/store", challengeValidationRules.createChallenge, ChallengeController.store);
router.put("/update/:id", challengeValidationRules.updateChallenge, ChallengeController.update);
router.post(
	"/store-payments",
	challengeValidationRules.createChallengePayment,
	ChallengePaymentController.store,
);

module.exports = router;
