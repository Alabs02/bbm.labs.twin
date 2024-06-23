const express = require("express");
const { PaymentController } = require("../controllers/index.js");

const router = express.Router();

router.post("/initialize", PaymentController.initializePayment);
router.get("/check-validity/:orderCodeOrPaymentToken", PaymentController.checkValidity);
router.post("/confirm-payment/:orderCodeOrPaymentToken", PaymentController.confirmPayment);
router.get("/initialization/:orderCodeOrPaymentToken", PaymentController.getInitialization);
router.post("/admin/confirm-payment", PaymentController.adminConfirmPayment);

module.exports = router;
