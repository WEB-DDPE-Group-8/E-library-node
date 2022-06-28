const router = require("express").Router();
const { body } = require("express-validator");

const {
  loginPage,
} = require("../controllers/authController");

const { eventPage,exportCSVevent } = require("../controllers/eventController.js");

const { isLoggedin, isNotLoggedin } = require("../lib/check_authentication");
const validator = require("../lib/validation_rules");

router.get("/pages/admin_events", isLoggedin, eventPage);
router.get("/pages/admin_events", isNotLoggedin, loginPage);

router.get('/pages/exportCSVevent', isLoggedin, exportCSVevent);

module.exports = router;
