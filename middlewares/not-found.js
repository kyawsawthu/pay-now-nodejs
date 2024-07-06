function notFound(req, res) {
  res.status(404).json({ code: "404", message: "Invalid endpoint." });
}

module.exports = notFound;
