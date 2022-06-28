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
      .withMessage("First Name required")
      .trim()
      .escape()
      .matches(/^[a-zA-Z]*$/)
      .withMessage("First Name: Only letters and no white space allowed"),

    // first Name sanitization and validation
    body("lname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last Name required")
      .isAlpha()
      .matches(/^[a-zA-Z]*$/)
      .withMessage("Last Name: Only letters and no white space allowed"),
      
    body("username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last Name required")
      .isAlpha()
      .withMessage("UserName: Only Characters with white space are allowed"),
  

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

    body("phonenumber")
      .notEmpty()
      .escape()
      .trim()
      .withMessage("Phone number Address required")
      .matches(/^[0-9]{11}$/)
      .withMessage("Invalid email address, Provide a valid email address!"),


    // password validation
    body("pass")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .withMessage("password must be minimum 5 character length")
      .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{6,12}$/)
      .withMessage(
        "A password must contain between 6 and 12 characters, and contains at least one number."
      ),

    // confirm password validation
    body("pass2").custom((value, { req }) => {
      if (value !== req.body.pass2) {
        throw new Error("Password does not match password");
      }
      return true;
    }),
    body("role")
    .trim()
    .notEmpty()
    .withMessage("role is required"),

    body("admin_code")
      .notEmpty()
      .isIn(codes)
  ],
  [
    
  ],
  [
    body("pass")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .withMessage("password must be minimum 5 character length")
      .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{6,12}$/)
      .withMessage(
        "A password must contain between 6 and 12 characters, and contains at least one number."
      ),

    // confirm password validation
    body("pass2").custom((value, { req }) => {
      if (value !== req.body.pass2) {
        throw new Error("Password does not match password");
      }
      return true;
    })
   
  ]

];
