const cors = require("cors");

const corsOptions = {
	origin: "https://bullbearmastery.com", 
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: "Content-Type, Authorization",
  credentials: true,
  optionsSuccessStatus: 204
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
