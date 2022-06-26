const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const dbConn = require("../config/db_Connection");

// Home Page
exports.homePage = (req, res, next) => {
  var query1 = "SELECT * FROM `courses`";
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.render("home", { data: result });
  });
};

// Register Page
exports.registerPage = (req, res, next) => {
  res.render("auth/register");
};

// User Registration
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  const { body } = req;

  if (!errors.isEmpty()) {
    return res.render("auth/register", { error: errors.array()[0].msg });
  }

  try {
    var query2 = "SELECT * FROM `users` WHERE `email`=?";
    dbConn.query(query2, [body.email], async (error, row) => {
      if (error) {
        console.log(error);
        throw error;
      }

      if (row.length >= 1) {
        return res.render("auth/register", {
          error: "This email already in use.",
        });
      }

      const hashPass = await bcrypt.hash(body.password, 12);
      var query3 =
        "INSERT INTO `users`(`fname`,`lname`,`gender`,`email`,`password`) VALUES(?,?,?,?,?)";
      dbConn.query(
        query3,
        [body.fname, body.lname, body.gender, body.email, hashPass],
        (error, rows) => {
          if (error) {
            console.log(error);
            throw error;
          }

          if (rows.affectedRows !== 1) {
            return res.render("auth/register", {
              error: "Your registration has failed.",
            });
          }

          res.render("auth/register", {
            msg: "You have successfully registered. You can Login now!",
          });
        }
      );
    });
  } catch (e) {
    next(e);
  }
};

// Login Page
exports.loginPage = (req, res, next) => {
  res.render("auth/login");
};

// Login User
exports.login = (req, res, next) => {
  const errors = validationResult(req);
  const { body } = req;

  if (!errors.isEmpty()) {
    return res.render("auth/login", { error: errors.array()[0].msg });
  }

  try {
    var query4 = "SELECT * FROM `users` WHERE `email`=?";
    dbConn.query(query4, [body.email], async function (error, row) {
      if (error) throw error;
      else {
        if (row.length != 1) {
          return res.render("auth/login", {
            error: "Invalid email address or password.",
          });
        }

        const checkPass = await bcrypt.compare(body.password, row[0].password);

        if (checkPass === true) {
          req.session.userID = row[0].id;
          return res.redirect("/");
        }

        res.render("auth/login", {
          error: "Invalid email address or password.",
        });
      }
    });
  } catch (e) {
    next(e);
  }
};
