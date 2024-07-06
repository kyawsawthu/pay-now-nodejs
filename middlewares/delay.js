function delay(req, res, next) {
  setTimeout(next, 1500);
}

module.exports = delay;
