function isDuplicateError(err) {
  return err.code === 11000;
}

module.exports = {
  isDuplicateError,
};
