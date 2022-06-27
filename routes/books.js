const router = require("express").Router();
const { body } = require("express-validator");

const {
  recordDisplayPage,
  addRecordPage,
  addRecord,
  recordEditPage,
  editRecord,
  recordDeletePage,
  loginPage,
} = require("../controllers/authController");


const { desc,booksPage, bookshelf  } = require("../controllers/bookController");

const { isLoggedin, isNotLoggedin } = require("../lib/check_authentication");
const validator = require("../lib/validation_rules");

router.get("/pages/bookshelf", isLoggedin, bookshelf);
router.get("/pages/bookshelf", isNotLoggedin, loginPage);

router.get("/pages/desc?:id", isLoggedin, desc);
router.get("/pages/desc", isLoggedin, desc);
router.get("/pages/bookshelf", isNotLoggedin, loginPage);

router.get("/pages/admin_books", isLoggedin, booksPage);
router.get("/pages/admin_books", isNotLoggedin, loginPage);


module.exports = router;
