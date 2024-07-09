const mongoose = require("mongoose");
const encrypt = require("../utils/encrypt");

const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  paymentCards: [{ type: ObjectId, ref: "payment-card" }],
});

userSchema.pre("save", async function (next) {
  this.password = await encrypt.hash(this.password);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await encrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.response = function () {
  return {
    id: this._id,
    name: this.name,
    mobileNumber: this.mobileNumber,
    imageUrl: this.imageUrl,
  };
};

module.exports = mongoose.model("user", userSchema);
