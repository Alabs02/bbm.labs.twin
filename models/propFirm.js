"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class PropFirm extends Model {
		static associate(models) {
			this.hasMany(models.AccountSize, { foreignKey: "prop_firm_id" });
		}
	}

	PropFirm.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			account_sizes: {
				type: DataTypes.JSON,
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
			modelName: "PropFirm",
			tableName: "prop_firms",
		},
	);

	return PropFirm;
};
