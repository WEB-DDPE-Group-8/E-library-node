var randtoken = require("rand-token");
var nodemailer = require("nodemailer");

const csvtojson = require('csvtojson');
var Json2csvParser = require('json2csv').Parser;

const util = require("util");

const { validationResult } = require("express-validator");
const encrypt = require("../lib/hashing");
const sendMail = require("../lib/sendEmail");

const dbConn = require("../config/db_Connection");
const { request } = require("express");

exports.bookshelf = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 12;

  const results = {};

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  var Count = `SELECT Count(BookID) FROM books `;

  var db = util.promisify(dbConn.query).bind(dbConn);

  Count = await db(Count).then((resd) => {
    return resd;
  });

  results.count = Count[0]["Count(BookID)"];
  //   var query1 = `SELECT * FROM books`

  //   if (endIndex < await model.countDocuments().exec()) {
  if (endIndex < (await Count[0]["Count(BookID)"])) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  var query1 = `SELECT * FROM books LIMIT ${limit} offset ${startIndex}`;

  try {
    //     results.results = await db.find().limit(limit).skip(startIndex).exec()
    results.results = await db(query1).then((resd) => {
      return resd;
    });
    //     res.paginatedResults = results
    //     next()
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
  // }

  res.locals.role = req.session.Role;
  res.render("pages/bookshelf", { data: results });
};

exports.desc = async (req, res, next) => {
  var id = req.query.bookid;

  var desc = `SELECT * FROM books where BookID = ${id} `;

  var db = util.promisify(dbConn.query).bind(dbConn);

  results = await db(desc).then((resd) => {
    return resd;
  });
  console.log(results);
  res.locals.role = req.session.Role;
  res.render("pages/desc", { data: results });
};

exports.booksPage = (req, res, next) => {
  var query1 = "SELECT * FROM `books` ";
  // var id = request.query.bookid;
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.locals.role = req.session.Role;
    res.render("pages/admin_books", { data: result });
  });
};

exports.exportCSV = (req, res, next) => {

  let query = "SELECT * FROM books";
  dbConn.query(query, function(err, results, fields) {
      if (err)
          throw err;

      const jsonCoursesRecord = JSON.parse(JSON.stringify(results));

      // -> Convert JSON to CSV data
      const csvFields = ['BookID', 'Title', 'Description ', 'Language ',
          'Year', 'Publisher', 'Price', 'Cover'
      ]

      const json2csvParser = new Json2csvParser({ csvFields });
      const csv = json2csvParser.parse(jsonCoursesRecord);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=books.csv");
      res.status(200).end(csv);
  });
}

exports.getStats = (req,res,next) =>{
  var query1 = "SELECT Genre, COUNT(BookID) AS Total FROM books GROUP BY Genre";
  // var id = request.query.bookid;
  dbConn.query(query1, async (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    // res.locals.role = req.session.Role;
   let data = {};
   data.language = result[0]["Genre"];
   data.total = result[0]["Total"];
   data.color = '#' + Math.random(100000, 999999)
    // res.sendStatus(200).json(data);
  });
}

// exports.getStats = (req,res,next) =>{
//   var query1 =  "SELECT IsAdmin, COUNT(UserID) AS Total FROM user GROUP BY IsAdmin";
//   // var id = request.query.bookid;
//   dbConn.query(query1, async (error, result) => {
//     if (error) {
//       console.log(error);
//       throw error;
//     }
//     res.locals.role = req.session.Role;
//    let data = {};
//    data.language = result[0]["Genre"];
//    data.total = result[0]["Total"];
//    data.color = '#' + Math.random(100000, 999999)
//     res.sendStatus(200).json(data);
//   });
// }