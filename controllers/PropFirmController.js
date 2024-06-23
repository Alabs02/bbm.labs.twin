const db = require("../models/index.js");

const PropFirmController = {
	async create(req, res) {
		const { name, account_sizes } = req.body;

		try {
			const propFirm = await db.PropFirm.create({ name, account_sizes });
			return res.status(201).json(propFirm);
		} catch (error) {
			console.error("Error in create prop firm:", error);
			return res.status(500).json({ error: error.message });
		}
	},

	async getAll(req, res) {
		try {
			const propFirms = await db.PropFirm.findAll({
				include: [{ model: db.AccountSize }],
			});
			return res.status(200).json(propFirms);
		} catch (error) {
			console.error("Error in get all prop firms:", error);
			return res.status(500).json({ error: error.message });
		}
	},

	async update(req, res) {
		const { id } = req.params;
		const { name, account_sizes } = req.body;

		try {
			const propFirm = await db.PropFirm.findByPk(id);
			if (!propFirm) {
				return res.status(404).json({ error: "Prop firm not found" });
			}
			propFirm.name = name;
			propFirm.account_sizes = account_sizes;
			await propFirm.save();
			return res.status(200).json(propFirm);
		} catch (error) {
			console.error("Error in update prop firm:", error);
			return res.status(500).json({ error: error.message });
		}
	},

	async delete(req, res) {
		const { id } = req.params;

		try {
			const propFirm = await db.PropFirm.findByPk(id);
			if (!propFirm) {
				return res.status(404).json({ error: "Prop firm not found" });
			}
			await propFirm.destroy();
			return res.status(204).send();
		} catch (error) {
			console.error("Error in delete prop firm:", error);
			return res.status(500).json({ error: error.message });
		}
	},
};

module.exports = PropFirmController;
