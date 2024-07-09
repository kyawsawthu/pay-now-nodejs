const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const accountController = require("../controllers/account-controller");

const router = Router();

router.get("/profile", authenticate, accountController.profile);
router.get("/search", authenticate, accountController.search);

module.exports = router;
