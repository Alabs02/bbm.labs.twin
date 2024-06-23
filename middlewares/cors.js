const cors = require("cors");

const corsOptions = {
	origin: true, // Allow all origins
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: "Content-Type, Authorization",
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
