const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const connectDB = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.js");
const userRoute = require("./api/routes/user");
const authRoute = require("./api/routes/auth");
const productRoute = require("./api/routes/product");
const cartRoute = require("./api/routes/cart");
const orderRoute = require("./api/routes/order");

const useBasePath = true;

// loading the config files
dotenv.config();

// connect the db
connectDB();

const app = express();

// HTTP request logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

// //docs
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));

app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to this simple reusable ecommerce API</h1><p>For API documentation, <a href="/docs">click here</a></p>'
  );
});

const port = process.env.PORT || 5000;

// server running in either
// production or development mode
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://0.0.0.0:${port}`
  );
  swaggerDocs(app, port)
});
