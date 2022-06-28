var randtoken = require("rand-token");
var nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");


const csvtojson = require('csvtojson');
var Json2csvParser = require('json2csv').Parser;


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

exports.exportCSVevent = (req, res, next) => {

  let query = "SELECT * FROM event";
  dbConn.query(query, function(err, results, fields) {
      if (err)
          throw err;

      const jsonCoursesRecord = JSON.parse(JSON.stringify(results));

      // -> Convert JSON to CSV data
      const csvFields = ['ID', 'NAME', 'Description ', 'Image ',
          'Status', 'CreatedAt']

      const json2csvParser = new Json2csvParser({ csvFields });
      const csv = json2csvParser.parse(jsonCoursesRecord);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=event.csv");
      res.status(200).end(csv);
  });
}