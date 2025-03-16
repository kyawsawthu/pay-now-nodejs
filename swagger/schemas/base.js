const baseSchemas = {
  ErrorResponse: {
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
  BaseResponse: {
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
};

module.exports = baseSchemas;
