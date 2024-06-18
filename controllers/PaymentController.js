const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const db = require("../models/index.js");
const path = require("path");
const { responseSerializer } = require("../helpers/index.js");
const { EmailService, ETEMPLATES } = require("../services/email.service.js");

// EMAIL SERVICE INSTANCES
const emailNotificationService = new EmailService(
	"notifications@bullbearmastery.com",
	"#1Hizlto",
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
      const expirationAt = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now
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

      return res.status(201).json(
        responseSerializer.format(
          true,
          "Payment initialization successful",
          response
        )
      );
    } catch (error) {
      console.error("Error initializing payment:", error);
      return res.status(500).json(
        responseSerializer.format(
          false,
          "Internal server error",
          null,
          [{ msg: error.message }]
        )
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
            { payment_token: orderCodeOrPaymentToken }
          ]
        }
      });

      if (!payment) {
        return res.status(404).json(
          responseSerializer.format(
            false,
            "Payment initialization not found",
            null
          )
        );
      }

      const isValid = payment.expires_at > new Date();

      return res.status(200).json(
        responseSerializer.format(
          true,
          "Payment initialization validity checked",
          { isValid }
        )
      );
    } catch (error) {
      console.error("Error checking payment validity:", error);
      return res.status(500).json(
        responseSerializer.format(
          false,
          "Internal server error",
          null,
          [{ msg: error.message }]
        )
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
            { payment_token: orderCodeOrPaymentToken }
          ]
        }
      });

      if (!payment) {
        return res.status(404).json(
          responseSerializer.format(
            false,
            "Payment initialization not found",
            null
          )
        );
      }

      return res.status(200).json(
        responseSerializer.format(
          true,
          "Payment initialization fetched successfully",
          payment.toJSON()
        )
      );
    } catch (error) {
      console.error("Error fetching payment initialization:", error);
      return res.status(500).json(
        responseSerializer.format(
          false,
          "Internal server error",
          null,
          [{ msg: error.message }]
        )
      );
    }
  },

  async confirmPayment(req, res) {
    const { orderCodeOrPaymentToken } = req.params;
    const { email, firstname, lastname } = req.body; // Assume user's email is provided in the request body

    try {
      const payment = await db.PaymentInitialization.findOne({
        where: {
          [Op.or]: [{ order_code: orderCodeOrPaymentToken }, { payment_token: orderCodeOrPaymentToken }],
        },
      });

      if (!payment) {
        return res.status(404).json(
          responseSerializer.format(false, 'Payment initialization not found.')
        );
      }

      const dashboardLink = process.env.CLIENT_DASHBOARD_URI;

      // Update the payment confirmation status and time
      await payment.update({ payment_confirmed: true, payment_confirmation_time: new Date() });

      // Send confirmation email
      await emailNotificationService.sendEmail(
        email,
        ETEMPLATES.PAYMENT_CONFIRMATION,
        'Payment Confirmation',
        { firstname, lastname, dashboardLink }
      );

      return res.status(200).json(
        responseSerializer.format(true, 'Payment confirmed. Please wait for 10 minutes for confirmation.', payment)
      );
    } catch (error) {
      console.error('Error in confirmPayment:', error);
      return res.status(500).json(
        responseSerializer.format(false, 'Internal error. Please contact support.', null, [{ msg: error.message }])
      );
    }
  },
};

module.exports = PaymentController;
