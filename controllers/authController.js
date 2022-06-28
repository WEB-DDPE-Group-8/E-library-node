var randtoken = require("rand-token");
var nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");
const encrypt = require("../lib/hashing");
const sendMail = require("../lib/sendEmail");

const csvtojson = require('csvtojson');
var Json2csvParser = require('json2csv').Parser;

const util = require("util");

const dbConn = require("../config/db_Connection");

// Home Page
exports.homePage = (req, res, next) => {
  // var query1 = "SELECT * FROM `books`";
  var query1 = "SELECT * FROM books WHERE Downloads > 500 order by Downloads ASC LIMIT 8";
  var query2  = "Select * from `event` where Status ='active' ";
  res.locals.role = req.session.Role;
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.render("home",{data:result});
  });
};

exports.profile = async (req, res, next) => {
  var id = req.session.userID;

  var result = {};

  var db = util.promisify(dbConn.query).bind(dbConn);

  var Uploads = `SELECT COUNT(BookID) from books where UserID = ${id} `;

  Uploads = await db(Uploads).then((resd) => {
    return resd;
  });
  
  result.uploads =await Uploads[0]["COUNT(BookID)"];

  res.locals.role = req.session.Role;

  var profile = "Select * From  `user` where UserID ="+ id ;
  
  profile =await db(profile).then((resd) => {
    return resd;
  })
 result.profile = profile[0];
  res.render("pages/profile", {data: result});
  
};

exports.cart = async (req, res, next) => {
  res.locals.role = req.session.Role;

  id = req.session.userID;

  var db = util.promisify(dbConn.query).bind(dbConn);

  // let cart = `SELECT * FROM cart WHERE UserID = ${id}`;
  let cart = `SELECT books.Cover,books.Book,books.Title,books.Author,cart.UserID,cart.BookID,cart.Price FROM cart INNER JOIN BOOKS ON books.BookID = cart.BookID WHERE CART.UserID= ${id}`;

  cart = await db(cart).then((resd) => {
    return resd;
  });
 console.log(id);
  res.render("pages/cart",{data:cart});
};

exports.bookshelf = (req, res, next) => {
  var query1 = "SELECT * FROM `books`";
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.locals.role = req.session.Role;
    res.render("pages/bookshelf", {data: result});
  });
};

// Register Page
exports.registerPage = (req, res, next) => {
  res.render("auth/register");
};

// User Registration
exports.register = async (req, res, next) => {
  console.log("register route");
  const errors = validationResult(req);
  const { body } = req;

  if (!errors.isEmpty()) {
    return res.render("auth/register", { error: errors.array()[0].msg });
  }

  try {
    var query2 = "SELECT * FROM `user` WHERE `Email`=?";
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

      const hashPass = await encrypt.encryptPassword(body.pass,12);
      var query3 =
        "INSERT INTO `user`(`FirstName`,`LastName`,`UserName`,`Email`,`Password`,`IsAdmin`) VALUES(?,?,?,?,?,?)";
      dbConn.query(
        query3,
        [body.fname, body.lname, body.username, body.email, hashPass, body.role],
        (error, rows) => {
          if (error) {
            console.log(error);
            throw error;
          }
          req.session.userID = rows.insertId;
          req.session.email = body.email;
          req.session.Role =body.IsAdmin;
          if (rows.affectedRows !== 1) {
            return res.render("auth/register", {
              error: "Your registration has failed.",
            });
          }

          var query1 = "SELECT * FROM books WHERE Downloads > 500 order by Downloads ASC LIMIT 8";
 
          dbConn.query(query1, async (error, result) => {
            if (error) {
              console.log(error);
              throw error;
            }
            res.locals.role = req.session.Role;
            res.render("home",{data:result});
          });
          // res.render("home");
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
exports.login =async (req, res, next) => {
  const errors = validationResult(req);
  const { body } = req;

  if (!errors.isEmpty()) {
    return res.render("auth/login", {
      error: errors.array()[0].msg,
    });
  }

  try {
    var query4 = "SELECT * FROM `user` WHERE `Email`=? OR `UserName`=?";
    dbConn.query(query4, [body.email,body.email], async function (error, row) {
      if (error) throw error;
      else {
        if (row.length != 1) {
          console.log("Invalid email address or password.");
          return res.render("auth/login", {
            error: "Invalid credentials.",
          });
        }

        //const checkPass = await bcrypt.compare(body.password, row[0].password);
        const checkPass = await encrypt.matchPassword(
          body.password,
          row[0].Password
        );

        if (checkPass === true) {
          req.session.userID = row[0].UserID;
          req.session.email = row[0].Email;
          req.session.Role =row[0].IsAdmin;
          const cookieval3 = await encrypt.encryptPassword(`${row[0].IsAdmin}`);
          res.cookie('A4Z',cookieval3, { maxAge: 900000, httpOnly: false,path: '/' });
          res.locals.role = req.session.Role;
          if(body.remember == "on"){
          console.log((row[0].UserID));
            const cookieval = await encrypt.encryptPassword(`${row[0].UserName}`);
            const cookieval2 = await encrypt.encryptPassword(`${row[0].Password}`);
           
          res.cookie('A2Z',cookieval, { maxAge: 900000, httpOnly: false,path: '/' });
          res.cookie('A3Z',cookieval2, { maxAge: 900000, httpOnly: false,path: '/' });
          
          }
          var query1 = "SELECT * FROM books WHERE Downloads > 500 order by Downloads ASC LIMIT 8";
          dbConn.query(query1, async (error, result) => {
            if (error) {
              console.log(error);
              throw error;
            }
           return  res.render("home",{data:result});
          });
        }
        else{
        console.log("Invalid cred");
        res.render("auth/login", {
          error: "Invalid password.",
        });
      }
      }
    });
  } catch (e) {
    next(e);
  }
};

// Password reset link request Page
exports.forgotPassword = (req, res, next) => {
  res.render("auth/passReset_Request");
};

/* send reset password link in email */
exports.sendResetPassLink = (req, res, next) => {
  const { body } = req;
  const email = body.email;

  var query2 = 'SELECT * FROM user WHERE Email ="' + email + '"';
  dbConn.query(query2, function (err, result) {
    if (err) throw err;

    var type = "";
    var msg = "";

    // if (result.email.length > 0) {
    if (result[0].Email.length > 0) {
      var token = randtoken.generate(20);
      const sent = sendMail.sendingMail(email, token);

      if (sent != "0") {
        var data = { code: token };
        var query3 = 'UPDATE user SET ? WHERE Email ="' + email + '"';
        dbConn.query(query3, data, function (err, result) {
          if (err) throw err;
        });

        res.render('auth/passReset_Request', 
        {
        msg: "The reset password link has been sent to your email address"});
      } else {
        type = "error";
        msg = "Something goes to wrong. Please try again";
      }
    } else {
      res.render('auth/passReset_Request', 
      {error: 'Something goes to wrong. Please try again'})
    }
  });
};

// Password reset link request Page
// exports.resetPasswordPage = (req, res, next) => {
//   res.render("pages/reset_password");
// };

exports.resetPasswordPage = (req, res, next) => {
  res.render("auth/reset_password", {token: req.query.token});
}

/* update password to database */
exports.resetPassword = (req, res, next) => {
	
	const errors = validationResult(req);
	const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('auth/reset_password', 
						   {token: token, error: errors.array()[0].msg});
		}
	
	var token = body.token;
    var query5 = 'SELECT * FROM user WHERE code ="' + token + '"';
    dbConn.query(query5, async(err, result) =>{
        if (err) 
			throw err;

        if (result.length > 0) {                  
            const hashPass = await encrypt.encryptPassword(body.pass);
			var query5 = 'UPDATE user SET password = ? WHERE Email ="' + result[0].Email + '"';
            dbConn.query(query5, hashPass, function(err, result) {
                if(err) 
					throw err
                });
				
				res.render('auth/login', 
						{token: 0, msg: 'Your password has been updated successfully'});			            
        } 
		else { 
			res.render("auth/reset_password", 
						{token: token, error: 'Invalid link; please try again'});			
        } 
    });
}

exports.adminpage = (req, res, next) => {
  res.locals.role = req.session.Role;
  res.render("pages/admin_page");
};

exports.userpage = (req, res, next) => {
  res.locals.role = req.session.Role;
  res.render("pages/admin_users");
};

exports.adminuser = (req, res, next) => {
  var query1 = "SELECT * FROM `user`";
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.locals.role = req.session.Role;
    res.render("pages/admin_users", {data: result});
  });
};

exports.visit = (req, res, next) => {
  var query1 = "SELECT * FROM `user`";
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.locals.role = req.session.Role;
    res.render("pages/visit", {data: result});
  });
};

exports.exportCSVuser = (req, res, next) => {

  let query = "SELECT * FROM user";
  dbConn.query(query, function(err, results, fields) {
      if (err)
          throw err;

      const jsonCoursesRecord = JSON.parse(JSON.stringify(results));

      // -> Convert JSON to CSV data
      const csvFields = ['UserID','UserName', 'FirstName', 'LastName ', 'Email ',
          'IsAdmin', 'About']

      const json2csvParser = new Json2csvParser({ csvFields });
      const csv = json2csvParser.parse(jsonCoursesRecord);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=users.csv");
      res.status(200).end(csv);
  });
}

