const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "ecommerce-api",
      description: "A simple ecommerce API for personal use",
      version: "1.0.0",
    },
  },
  apis: ["./api/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const port = process.env.PORT || 5000;

const swaggerDocs = (app, port) => {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.info(`Docs available at http://localhost:${port}/docs`);
};

module.exports = swaggerDocs;
