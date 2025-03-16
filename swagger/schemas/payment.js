const paymentSchemas = {
  PaymentCard: {
    type: "object",
    properties: {
      id: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
      cardNumber: { type: "string", example: "4111111111111111" },
      cardHolderName: { type: "string", example: "John Doe" },
      expiryDate: { type: "string", example: "12/25" },
      cvv: { type: "string", example: "123" },
    },
  },
  AddCardRequest: {
    type: "object",
    required: ["cardNumber", "cardHolderName", "expiryDate", "cvv"],
    properties: {
      cardNumber: { type: "string", example: "4111111111111111" },
      cardHolderName: { type: "string", example: "John Doe" },
      expiryDate: { type: "string", example: "12/25" },
      cvv: { type: "string", example: "123" },
    },
  },
  UpdateCardRequest: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
      cardNumber: { type: "string", example: "4111111111111111" },
      cardHolderName: { type: "string", example: "John Doe" },
      expiryDate: { type: "string", example: "12/25" },
      cvv: { type: "string", example: "123" },
    },
  },
  DeleteCardRequest: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
    },
  },
};

module.exports = paymentSchemas;
