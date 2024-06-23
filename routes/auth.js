const express = require("express");

// VALIDATORS
const { authValidationRules } = require("../validators/index.js");

// CONTROLLER
const { AuthController } = require("../controllers/index.js");

const router = express.Router();

// ROUTES
router.post("/verify-email", AuthController.verifyEmailCode);
router.post("/terminate-session", AuthController.terminateSession);
router.post("/resend-verification", AuthController.resendVerificationCode);
router.post("/register", authValidationRules.register, AuthController.register);
router.post("/token-manager", authValidationRules.tokenManager, AuthController.tokenManager);
router.post("/reset-password", authValidationRules.resetPassword, AuthController.resetPassword);
router.post("/forgot-password", authValidationRules.forgotPassword, AuthController.forgotPassword);

module.exports = router;
