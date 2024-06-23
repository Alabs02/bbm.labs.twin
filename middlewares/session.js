const session = require('express-session');
const dotenv = require('dotenv');
const { generateSessionCookieName, generateSessionSecret } = require('./utils/index.js');

dotenv.config();

const environment = process.env.NODE_ENV;

const sessionSecret = process.env.SESSION_SECRET || generateSessionSecret();
const sessionCookieName = generateSessionCookieName();

const sessionMiddleware = session({
	secret: sessionSecret,
	resave: false,
	saveUninitialized: true,
	name: sessionCookieName, // Custom session cookie name
	cookie: {
		maxAge: 1000 * 60 * 60 * 24, // 1 day
		secure: environment === 'production', // Use secure cookies in production
		httpOnly: true,
	}
});

module.exports = sessionMiddleware;
