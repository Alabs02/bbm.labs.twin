const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const isDev = process.env.NODE_ENV === "development";

const origin = isDev ? "*" : "https://bullbearmastery.com";

const corsOptions = {
	origin, 
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: "Content-Type, Authorization",
  credentials: isDev ? false : true,
  optionsSuccessStatus: 204
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware; 
