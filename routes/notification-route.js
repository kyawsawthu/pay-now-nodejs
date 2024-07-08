const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const notificationController = require("../controllers/notification-controller");

const router = Router();

router.get("/history", authenticate, notificationController.history);

module.exports = router;
