const swaggerJsdoc = require("swagger-jsdoc");
const schemas = require("./schemas");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pay Now API Documentation",
      version: "1.0.0",
      description: "Documentation for Pay Now payment system API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas,
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    tags: [
      { name: "auth" },
      { name: "account" },
      { name: "wallet" },
      { name: "payment-card" },
      { name: "transaction" },
    ],
  },
  apis: ["./swagger/routes/*.swagger.js"],
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
  },
};

const specs = swaggerJsdoc(options);
module.exports = specs;
