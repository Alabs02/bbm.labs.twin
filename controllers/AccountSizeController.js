const db = require("../models/index.js");

const AccountSizeController = {
	async create(req, res) {
		const { size, fee, prop_firm_id } = req.body;

		try {
			const accountSize = await db.AccountSize.create({ size, fee, prop_firm_id });
			return res.status(201).json(accountSize);
		} catch (error) {
			console.error("Error in create account size:", error);
			return res.status(500).json({ error: error.message });
		}
	},

	async getAll(req, res) {
		try {
			const accountSizes = await db.AccountSize.findAll();
			return res.status(200).json(accountSizes);
		} catch (error) {
			console.error("Error in get all account sizes:", error);
			return res.status(500).json({ error: error.message });
		}
	},

	async update(req, res) {
		const { id } = req.params;
		const { size, fee, prop_firm_id } = req.body;

		try {
			const accountSize = await db.AccountSize.findByPk(id);
			if (!accountSize) {
				return res.status(404).json({ error: "Account size not found" });
			}
			accountSize.size = size;
			accountSize.fee = fee;
			accountSize.prop_firm_id = prop_firm_id;
			await accountSize.save();
			return res.status(200).json(accountSize);
		} catch (error) {
			console.error("Error in update account size:", error);
			return res.status(500).json({ error: error.message });
		}
	},

	async delete(req, res) {
		const { id } = req.params;

		try {
			const accountSize = await db.AccountSize.findByPk(id);
			if (!accountSize) {
				return res.status(404).json({ error: "Account size not found" });
			}
			await accountSize.destroy();
			return res.status(204).send();
		} catch (error) {
			console.error("Error in delete account size:", error);
			return res.status(500).json({ error: error.message });
		}
	},
};

module.exports = AccountSizeController;
