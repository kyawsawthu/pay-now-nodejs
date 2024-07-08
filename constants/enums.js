const OTPPurpose = Object.freeze({
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
});

const TransactionType = Object.freeze({
  IN: "in",
  OUT: "out",
});

const TransactionStatus = Object.freeze({
  PENDING: "pending",
  DECLINED: "declined",
  CANCELED: "canceled",
  DONE: "done",
});

const NotificationTitle = Object.freeze({
  PAYMENT_SUCCESS: "Payment Success",
});

module.exports = {
  OTPPurpose,
  TransactionType,
  TransactionStatus,
  NotificationTitle,
};
