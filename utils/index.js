const mapKeys = require("lodash/mapKeys");
const isEmpty = require("lodash/isEmpty");
const camelCase = require("lodash/camelCase");
const crypto = require("crypto");

function generateSessionCookieName() {
	const randomString = crypto.randomBytes(16).toString("hex");
	const obfuscatedName = crypto.createHash("sha256").update(randomString).digest("hex");
	return `sess_${obfuscatedName}`;
}

function generateSessionSecret() {
	return crypto.randomBytes(32).toString("hex");
}

module.exports = {
	mapKeys,
	isEmpty,
	camelCase,
	generateSessionCookieName,
	generateSessionSecret,
};
