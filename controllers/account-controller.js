const userService = require("../services/user-service");

async function profile(req, res) {
  try {
    const user = await userService.getUserById(req.userId);
    res.success(user.response());
  } catch (err) {
    res.fail(err);
  }
}

async function search(req, res) {
  try {
    const { mobileNumber } = req.query;
    const users = await userService.searchWithMobileNumber(mobileNumber);
    const response = users
      .filter((e) => e._id != req.userId)
      .map((e) => e.response());
    res.success(response);
  } catch (err) {
    res.fail(err);
  }
}

module.exports = {
  profile,
  search,
};
