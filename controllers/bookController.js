var randtoken = require("rand-token");
var nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");
const encrypt = require("../lib/hashing");
const sendMail = require("../lib/sendEmail");

const dbConn = require("../config/db_Connection");
const { request } = require("express");

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

exports.desc = (req, res, next) => {
   // var id = request.query.bookid;
  var query1 = "SELECT * FROM `books` ";

  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.render("pages/desc", {data:result });
  });
};

exports.booksPage = (req, res, next) => {
  var query1 = "SELECT * FROM `books` ";
  // var id = request.query.bookid;
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.render("pages/admin_books", { data: result });
  });
};
