const swaggerJsdoc = require("swagger-jsdoc");

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
        description: "DevelopmentServer",
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
      schemas: {
        Error: {
          type: "object",
          properties: {
            code: {
              type: "string",
              example: "AE001",
            },
            message: {
              type: "string",
              example: "Invalid credentials",
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            code: {
              type: "string",
              example: "",
            },
            message: {
              type: "string",
              example: "success",
            },
            data: {
              type: "object",
              nullable: true,
            },
          },
        },
        UserProfile: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            mobileNumber: { type: "string" },
            imageUrl: {
              type: "string",
              nullable: true,
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
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
      { name: "payment" },
      { name: "transaction" },
    ],
  },
  apis: ["./routes/*.js"],
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
  },
};

const specs = swaggerJsdoc(options);
module.exports = specs;
