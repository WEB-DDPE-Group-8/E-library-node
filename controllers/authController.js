var randtoken = require("rand-token");
var nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");
const encrypt = require("../lib/hashing");
const sendMail = require("../lib/sendEmail");

const dbConn = require("../config/db_Connection");

// Home Page
exports.homePage = (req, res, next) => {
  // var query1 = "SELECT * FROM `books`";
  var query1 = "SELECT * FROM books WHERE Downloads > 500 order by Downloads ASC LIMIT 8";
  var query2  = "Select * from `event` where Status ='active' ";
  
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.render("home",{data:result});
  });
};
exports.profile = (req, res, next) => {
  res.render("pages/profile");
};

exports.cart = (req, res, next) => {
  res.render("pages/cart");
};

exports.bookshelf = (req, res, next) => {
  var query1 = "SELECT * FROM `books`";
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.render("pages/bookshelf", {data: result});
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

      //const hashPass = await bcrypt.hash(body._password, 12);
      const hashPass = await encrypt.encryptPassword(body.password);
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

  var query2 = 'SELECT * FROM user WHERE email ="' + email + '"';
  dbConn.query(query2, function (err, result) {
    if (err) throw err;

    if (result.length > 0) {
      const token = randtoken.generate(20);
      const sent =  sendMail.sendingMail(email, token);
      
      if (sent != '0') 
      {
        var data = {token: token}
        var query3 = 'UPDATE users SET ? WHERE email ="' + email + '"';
        dbConn.query(query3, data, function(err, result) {
          if(err) 
            throw err 
        })
        
       res.render('auth/passReset_Request', 
            {msg: 'The reset password link has been sent to your email address'});
       } 
      else {		
        res.render('auth/passReset_Request', 
              {error: 'Something goes to wrong. Please try again'})
      }
    } 
    else {
      console.log('2');			
      res.render('auth/passReset_Request', 
          {error: 'The Email is not registered with us'})				
    }		
  });
}


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
    var query5 = 'SELECT * FROM user WHERE token ="' + token + '"';
    dbConn.query(query5, async(err, result) =>{
        if (err) 
			throw err;

        if (result.length > 0) {                  
            const hashPass = await encrypt.encryptPassword(body.password);
			var query5 = 'UPDATE user SET password = ? WHERE email ="' + result[0].email + '"';
            dbConn.query(query5, hashPass, function(err, result) {
                if(err) 
					throw err
                });
				
				res.render("auth/login", 
						{token: 0, msg: 'Your password has been updated successfully'});			            
        } 
		else { 
            console.log('2');
			res.render("auth/reset_password", 
						{token: token, error: 'Invalid link; please try again'});			
        } 
    });
}




exports.adminpage = (req, res, next) => {
  res.render("pages/admin_page");
};


exports.userpage = (req, res, next) => {
  res.render("pages/admin_users");
};

exports.adminuser = (req, res, next) => {
  var query1 = "SELECT * FROM `user`";
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
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
    res.render("pages/visit", {data: result});
  });
};

