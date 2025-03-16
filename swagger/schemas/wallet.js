const walletSchemas = {
  WalletBalance: {
    type: "object",
    properties: {
      balance: { type: "string", example: "1000.00" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  TopUpRequest: {
    type: "object",
    required: ["paymentId", "amount"],
    properties: {
      paymentId: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
      amount: { type: "string", example: "100.00" },
    },
  },
  TransferRequest: {
    type: "object",
    required: ["userId", "amount"],
    properties: {
      userId: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
      amount: { type: "string", example: "100.00" },
      note: { type: "string", example: "Payment for dinner" },
    },
  },
  ApproveRequest: {
    type: "object",
    required: ["transactionId"],
    properties: {
      transactionId: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
    },
  },
  DeclineRequest: {
    type: "object",
    required: ["transactionId"],
    properties: {
      transactionId: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
    },
  },
};

module.exports = walletSchemas;
