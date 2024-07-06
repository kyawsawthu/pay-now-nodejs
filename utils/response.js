function response(code, message, data) {
  if (arguments.length === 0) {
    return {
      code: "",
      message: "success",
      data: null,
    };
  } else if (arguments.length === 1) {
    return {
      code: "",
      message: "success",
      data: data,
    };
  } else if (arguments.length === 2) {
    return {
      code: code,
      message: message,
      data: null,
    };
  } else if (arguments.length == 3) {
    return {
      code: code,
      message: message,
      data: data,
    };
  }
}

module.exports = response;
