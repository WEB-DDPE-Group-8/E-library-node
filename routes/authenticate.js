const router = require("express").Router();
const { body } = require("express-validator");

/* pages route */
const {
  homePage,
  register,
  registerPage,
  login,
  loginPage,
  forgotPassword,
  sendResetPassLink,
  resetPasswordPage,
  bookshelf,
  adminpage,
  eventpage,
  adminuser,
  bookpage,
  profile,
  cart,
  visit
} = require("../controllers/authController");

const { isLoggedin, isNotLoggedin } = require("../lib/check_authentication");
const validator = require("../lib/validation_rules");

router.get('/', isLoggedin, homePage);
router.post("/", isLoggedin, homePage);

router.get("/auth/login", isNotLoggedin, loginPage);
router.post("/auth/login", isNotLoggedin, validator.validationRules[0], login);

router.get("/auth/signup", isNotLoggedin, registerPage);
router.post(
  "/auth/signup",
  isNotLoggedin,
  validator.validationRules[1],
  register
);

router.get("/logout", (req, res, next) =>{
  req.session.destroy((err) => {
    next(err);
  });
  res.redirect("/auth/login");
});

router.get("/pages/passReset_Request", isNotLoggedin, forgotPassword);
router.post("/pages/passReset_Request", isNotLoggedin, sendResetPassLink);

router.get("/pages/reset_password", isNotLoggedin, resetPasswordPage);

router.get("/pages/admin_page", isLoggedin, adminpage);

// router.get("/pages/admin_events", isLoggedin, eventpage);

router.get("/pages/admin_users", isLoggedin, adminuser);

// router.get("/pages/admin_books", isLoggedin, bookpage);

router.get("/pages/profile", isLoggedin, profile);

router.get("/pages/cart", isLoggedin, cart);

router.get("/pages/visit", isLoggedin, visit);


module.exports = router;
