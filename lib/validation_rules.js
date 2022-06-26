/*
 * Node js validation - check these links for details
 * https://express-validator.github.io/docs/check-api.html
 * https://github.com/validatorjs/validator.js#validators
 */

const { body, check } = require("express-validator");

exports.validationRules = [
  [
    body("email", "Invalid email address or password")
      .notEmpty()
      .trim()
      .escape(),

    body("password", "The Password must be of minimum 5 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 5 }),
  ],
  [
    // first Name sanitization and validation
    body("fname")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("First Name required")
      .matches(/^[a-zA-Z ]*$/)
      .withMessage("Name: Only Characters with white space are allowed"),

    // first Name sanitization and validation
    body("lname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last Name required")
      .isAlpha()
      .withMessage("Only Characters with white space are allowed"),

    //email address validation
    body("email")
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Email Address required")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email address, Provide a valid email address!"),

    //email address validation
    body("gender", "Gender is required").notEmpty(),

    // password validation
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 5, max: 20 })
      .withMessage("password must be minimum 5 character length")
      .isStrongPassword({
        minLength: 5,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
      })
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),

    // confirm password validation
    body("cpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password does not match password");
      }
      return true;
    }),
  ],
  [
    body("course_title", "Title is required")
      .notEmpty()
      .withMessage("Title is required")
      .trim()
      .escape()
      .isAlpha().withMessage("Only Characters with white space are allowed")
      .matches(/^[A-Za-z.#+ ]*$/).withMessage("Only Characters,white space .,# and + are allowed"),

    body("course_code", "Course code is required")
      .notEmpty().withMessage("Course code  is required")
      .trim()
      .escape()
      .isLength({ min: 4 }).withMessage("course code min length 4")
      .isUppercase().withMessage("course code upper case required")
      .isAlphanumeric().withMessage("course code should be alphanumeric")
      .matches(/^[A-Z]{2}/).withMessage("course code must start with 2 letters"),

    body("course_desc", "Description is required")
		.trim()
		.escape()
		.notEmpty().withMessage("Description  is required"),

    body("course_cat", "Category is required")
      .notEmpty().withMessage("Category  is required")
      .trim()
      .escape()
      .matches(/^[a-zA-Z ]*$/).withMessage("category must be only letters"),

    body("certificate", "Certificate is required")
      .notEmpty().withMessage("Certificate  is required")
      .trim()
      .escape()
      .matches(/^[a-zA-Z ]*$/).withMessage("Certificate must be only letters"),

    body("course_dur", "Duration is required")
      .notEmpty().withMessage("Duration  is required")
      .trim()
      .escape()
	  .isInt({gt:0}).withMessage("Only positive numbers are allowed"),

    body("course_cost", "Cost is required")
      .notEmpty().withMessage("Cost  is required")
      .trim()
      .escape()
      .isDecimal({
        options: {
          no_symbols: false,
        },
      }).withMessage("Only decimals are allowed"),
    body("course_img", "image is required")
		.notEmpty()
		.withMessage("Image is required"),
  ],
];
