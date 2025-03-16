const accountSchemas = {
  UserProfile: {
    type: "object",
    properties: {
      id: { type: "string", example: "64f3e4b1c2f3a1b2c3d4e5f6" },
      name: { type: "string", example: "John Doe" },
      mobileNumber: { type: "string", example: "9876543210" },
      imageUrl: {
        type: "string",
        nullable: true,
        example: "https://example.com/avatar.jpg",
      },
    },
  },
};

module.exports = accountSchemas;
