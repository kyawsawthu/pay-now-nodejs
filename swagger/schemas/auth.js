const authSchemas = {
  LoginRequest: {
    type: "object",
    required: ["mobileNumber", "password"],
    properties: {
      mobileNumber: { type: "string", example: "9876543210" },
      password: {
        type: "string",
        example: "password123",
      },
    },
  },
  RegisterRequest: {
    type: "object",
    required: ["name", "mobileNumber", "password"],
    properties: {
      name: { type: "string", example: "John Doe" },
      mobileNumber: { type: "string", example: "9876543210" },
      password: {
        type: "string",
        example: "password123",
      },
    },
  },
  RequestOTPRequest: {
    type: "object",
    required: ["mobileNumber", "purpose"],
    properties: {
      mobileNumber: { type: "string", example: "9876543210" },
      purpose: {
        type: "string",
        enum: ["register", "forgot-password"],
        example: "register",
      },
    },
  },
  VerifyOTPRequest: {
    type: "object",
    required: ["mobileNumber", "otp", "purpose"],
    properties: {
      mobileNumber: { type: "string", example: "9876543210" },
      otp: { type: "string", example: "1234" },
      purpose: {
        type: "string",
        enum: ["register", "forgot-password"],
        example: "register",
      },
    },
  },
};

module.exports = authSchemas;
