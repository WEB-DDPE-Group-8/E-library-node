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
  resetPassword,
  bookshelf,
  adminpage,
  eventpage,
  adminuser,
  bookpage,
  profile,
  cart,
  visit,
  exportCSVuser
} = require("../controllers/authController");

const { isLoggedin, isNotLoggedin } = require("../lib/check_authentication");
const validator = require("../lib/validation_rules");

router.get('/', isLoggedin, homePage);
router.get('/', isNotLoggedin, homePage);

router.post("/", isLoggedin, homePage);

router.get("/auth/login", isNotLoggedin, loginPage);
router.post("/auth/login", isNotLoggedin, validator.validationRules[0], login);

router.get("/auth/signup", isNotLoggedin, registerPage);
router.post("/auth/signup",isNotLoggedin,validator.validationRules[1],register);

router.get("/logout", (req, res, next) =>{
  // res.cookie('A2Z',1234, { maxAge: 0, httpOnly: false });
  // res.cookie('A3Z',1234, { maxAge: 0, httpOnly: false });
  // res.cookie('A4Z',1234, { maxAge: 0, httpOnly: false });
  req.session.destroy((err) => {
    next(err);
  });
  res.redirect("/auth/login");
})

router.get("/auth/passReset_Request", isNotLoggedin, forgotPassword);
router.post("/auth/passReset_Request", isNotLoggedin, sendResetPassLink);

router.get("/auth/reset_password", isNotLoggedin, resetPasswordPage);
router.post("/auth/reset_password", isNotLoggedin, validator.validationRules[3], resetPassword);

router.get("/pages/admin_page", isLoggedin, adminpage);

// router.get("/pages/admin_events", isLoggedin, eventpage);

router.get("/pages/admin_users", isLoggedin, adminuser);

// router.get("/pages/admin_books", isLoggedin, bookpage);

router.get("/pages/profile", isLoggedin, profile);
router.get("/pages/profile", isNotLoggedin, loginPage);

router.get("/pages/cart", isLoggedin, cart);

router.get("/pages/visit", isLoggedin, visit);
router.get('/pages/exportCSVuser', isLoggedin, exportCSVuser);


module.exports = router;
