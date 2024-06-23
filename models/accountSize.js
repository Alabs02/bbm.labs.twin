"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class AccountSize extends Model {
		static associate(models) {
			this.belongsTo(models.PropFirm, { foreignKey: "prop_firm_id" });
		}
	}

	AccountSize.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			size: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			fee: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			prop_firm_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			deleted_at: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			paranoid: true,
			timestamps: true,
			underscored: true,
			modelName: "AccountSize",
			tableName: "account_sizes",
		},
	);

	return AccountSize;
};
