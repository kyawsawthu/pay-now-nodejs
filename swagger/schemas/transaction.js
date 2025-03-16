const transactionSchemas = {
  Transaction: {
    type: "object",
    properties: {
      id: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
      amount: { type: "string", example: "100.00" },
      type: { type: "string", enum: ["in", "out"] },
      status: {
        type: "string",
        enum: ["pending", "declined", "canceled", "done"],
        example: "done",
      },
      note: { type: "string", example: "Payment for dinner" },
      date: { type: "string", format: "date-time" },
      user: { $ref: "#/components/schemas/UserProfile" },
    },
  },
};

module.exports = transactionSchemas;
