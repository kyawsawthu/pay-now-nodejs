const { PaymentError } = require("../errors");

function validate(req) {
  const { cardNumber, cardHolderName, expiryDate, cvv } = req.body;
  const cardNumberRegex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  const cardHolderNameRegex = /^[A-Za-z\s]+$/;
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const cvvRegex = /^[0-9]{3,4}$/;
  if (!cardNumberRegex.test(cardNumber)) {
    throw PaymentError.invalidCardNumber;
  }
  if (!cardHolderNameRegex.test(cardHolderName)) {
    throw PaymentError.invalidCardHolderName;
  }
  if (!expiryDateRegex.test(expiryDate)) {
    throw PaymentError.invalidExpiryDate;
  }

  const [expMonth, expYear] = expiryDate.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns month from 0-11
  if (
    expYear < currentYear ||
    (expYear == currentYear && expMonth < currentMonth)
  ) {
    throw PaymentError.invalidExpiryDate;
  }
  if (!cvvRegex.test(cvv)) {
    throw PaymentError.invalidCVV;
  }
}

module.exports = { validate };
