const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const productRoutes = require("./routes/product.routes");

const { protect } = require("./middleware/auth.middleware");


const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body parser
app.use(express.json());
app.use("/api/products", productRoutes);

// CORS
app.use(cors());

// Logger
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = app;
