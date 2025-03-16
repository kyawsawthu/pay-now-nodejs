const mongoose = require("mongoose");

const connect = async (url) => {
  try {
    await mongoose.connect(url, {
      // Remove deprecated options
      // Modern MongoDB driver handles these automatically
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
  }
};

module.exports = {
  connect,
  disconnect,
};
