const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description: "API for managing projects",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: [path.join(__dirname, "../src/routes/*.js")],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocs),
};
