const router = require("express").Router();
const { body } = require("express-validator");

/* pages route */
const {
  homePage,
  register,
  registerPage,
  login,
  loginPage,
} = require("../controllers/authController1");

const { isLoggedin, isNotLoggedin } = require("../lib/check_authentication");
const validator = require("../lib/validation_rules");

router.get("/", homePage);

router.get("/auth/login", isNotLoggedin, loginPage);
router.post("/auth/login", isNotLoggedin, validator.validationRules[0], login);

router.get("/auth/signup", isNotLoggedin, registerPage);
router.post(
  "/auth/signup",
  isNotLoggedin,
  validator.validationRules[1],
  register
);

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    next(err);
  });
  res.redirect("/auth/login");
});

module.exports = router;
