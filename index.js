const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const {
	authRoutes,
	lookupRoutes,
	newsletterRoutes,
	contactRoutes,
	propFirmRoutes,
	accountSizeRoutes,
	challengeRoutes,
	paymentRoutes,
	analyticsRoutes,
} = require("./routes/index.js");

// MIDDLEWARES
const { cors, listRoutes, limiter, sessionMiddleware } = require("./middlewares/index.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8005;
const environment = process.env.NODE_ENV;

// Middleware
app.use(cors);
app.use(limiter);
app.use(bodyParser.json());

app.options('*', cors);

// if(environment === 'production') {
//   app.use(sessionMiddleware);
// }

if (environment === "production") {
	app.use((req, res, next) => {
		if (!req.secure) {
			return res.redirect(`https://${req.headers.host}${req.url}`);
		}
		next();
	});
}

// ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/lookup", lookupRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/prop-firms", propFirmRoutes);
app.use("/api/v1/challenge", challengeRoutes);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/account-sizes", accountSizeRoutes);

// List all routes when the server starts
if (environment === "development") {
	listRoutes(app);
}

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		error: "Oops! Something went wrong. Please try again or contact support for assistance.",
	});
});

app.listen(PORT, () => {
  if (environment === "development") {
    console.log(
      `Server running at http://localhost:${PORT}. Access it locally to view your application`,
    );
  } else {
    console.log(
      `Server is running!`,
    );
  }
});

module.exports = app;
