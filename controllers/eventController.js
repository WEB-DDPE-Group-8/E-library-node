var randtoken = require("rand-token");
var nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");


const dbConn = require("../config/db_Connection");
const { request } = require("express");

exports.eventPage = (req, res, next) => {
  var query1 = "SELECT * FROM `event` ";
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(result);
    return res.render('pages/admin_events', {event: result});
  });
};

// exports.desc = (req, res, next) => {
//   var query1 = "SELECT * FROM `books` ";
//   // var id = request.query.bookid;
//   dbConn.query(query1, async (error, result) => {
//     if (error) {
//       console.log(error);
//       throw error;
//     }
//     res.render("pages/desc", { data: result });
//   });
// };
