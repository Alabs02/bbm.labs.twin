"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class PaymentInitialization extends Model {
		static associate(models) {
      this.hasMany(models.ChallengePayment, { foreignKey: "payment_initializations_id" });
    }
	}

	PaymentInitialization.init(
		{
			id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      step_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      step_label: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      step_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currency_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      account_size_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      network_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      network_label: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_payable_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      has_agreed_to_terms: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      payment_token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      order_code: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true,
      },
		},
		{
			sequelize,
			paranoid: true,
			timestamps: false,
			underscored: true,
			modelName: "PaymentInitialization",
			tableName: "payment_initializations",
		},
	);

	return PaymentInitialization;
};
