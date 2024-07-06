const response = require("../utils/response");
function formatResponse(req, res, next) {
  res.success = (data, code, message) => {
    const responseData = response(
      code || "",
      message || "success",
      data || null
    );
    res.status(200).json(responseData);
  };
  res.fail = (err) => {
    console.log(err);
    const responseData = response(
      err.code || "500",
      err.message || "Something went wrong."
    );
    res.status(err.statusCode || 500).json(responseData);
  };
  next();
}

module.exports = formatResponse;
