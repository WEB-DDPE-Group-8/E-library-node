
const dbConn = require("../config/db_Connection")
const { validationResult } = require("express-validator");

const multer = require('multer')
const path = require('path');

const validator = require('../lib/validation_rules');
// const {imageUploader} = require('../lib/image_upload');

// Record Display Page
exports.recordDisplayPage = (req, res, next) => {

	var query1 = 'SELECT * FROM `event`';
	dbConn.query(query1, (error, result)=>{
	
		if(error)
		{
			console.log(error);
			throw error;
		}

		const msg = req.flash ('success')
		res.render('pages/display', {data:result, msg});
	});	
}

// Image uplaod Page
exports.imageUploadPage = (req, res, next) => {

	var code = req.params.id;  //extract course code attached to the URL
	
	var query2 = `SELECT * FROM courses WHERE code = "${code}"`;
	dbConn.query(query2, function(error, result){
		if(error)
		{
			console.log(error);
			throw error;
		}
		errorMsg = req.flash("error")
		message = req.flash("msg")
		res.render('pages/addImage',{
										data: result[0], 
										error: errorMsg, 
										msg: message,
										title : "Upload Image"
									});
	});
}

// Record Add Page
exports.addRecordPage = (req, res, next) => {
    res.render("pages/add");
};

// Adding New Record
exports.addRecord = async(req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('pages/add', {error: errors.array()[0].msg});
    }

	// const upload = multer(imageUploader).single('course_img');
	
	// upload(req, res, function(err) {
	// if (!req.file)
	// 	return res.render('pages/add', {error: 'Error: No file. You must select a file'});
	
	// const today = new Date();
	// const today_date = today.getFullYear() + '-' + ("0" + today.getMonth()+1).slice(-2) +'-'+ ("0" + today.getDate()).slice(-2);
	// console.log (req.file);
	// var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.fieldname + '-' + today_date + path.extname(req.file.originalname)
	// console.log (imgsrc);
	// });
	
    try {
		 code = body.course_code
		 title = body.course_title
		 desc = body.course_desc
		 cat = body.course_cat
		 cert = body.certificate
		 duration = body.course_dur
		 cost = body.course_cost		 

		 
		var query3 = "INSERT INTO `courses` (`code`, `title`, `description`, `category`, `certificate`, `duration`, `cost`, `image-path`) VALUES(?,?,?,?,?,?,?,?)";
		dbConn.query(query3, [code, title, desc, cat, cert, duration, cost, '0'], 
					(error, rows)=>{
						if(error)
						{
							console.log (error);
							throw error;
						}
						
						if (rows.affectedRows !== 1) {
							return res.render('pages/add', 
												{error: 'Error: Record not added.'});
						}

						res.render("pages/add", {
								msg: 'Record successfully added!'});
				    });
    } 
	catch (e) {
        next(e);
    }
};

// Image uplaod middleware
exports.uploadImage = (req, res, next) => {

	var code = req.params.id;  //extract course code attached to the URL
	
	/* Checking if course icon (image) upload success */
	const upload = uploadImage.single('course_img')
	upload(req, res, function(err) {
		if (req.file == undefined || err) {
			req.flash("error", "Error: You must select an image.\r\n Only image files [JPG | JPEG | PNG] are allowed!")
			req.flash ("title", "Upload Image")
			return res.redirect("./"+code);
		}		

		//retrive and check if there is image uploaded already
		var query1 = `SELECT imagePath FROM courses WHERE code = "${code}"`;
		var oldImagePath = "";
		dbConn.query(query1, function(error, result){
			if(error){
				throw error;
			}
			oldImagePath = result[0].imagePath;
		});
		
		var imgsrc = '/images/' + req.file.filename
		//console.log(imgsrc)
		
		var query2 = `UPDATE courses SET imagePath = "${imgsrc}" WHERE code = "${code}"`;
		dbConn.query(query2, function(error, result){
			if(error)
			{
				//Image is path is not added to database. Remove Uplaoded file.
				// and send error to the client
				fs.unlinkSync('public' + imgsrc);
				console.log(error)
				return res.send(error);
			}
			
			//remove existing image
			else{
				if (oldImagePath && oldImagePath != "None" && oldImagePath != imgsrc)
					fs.unlinkSync('public' + oldImagePath);
			}
			req.flash("msg", "Image is uploaded. Go back to Home page & check it.")
			req.flash ("title", "Upload Image")
			return res.redirect("./"+code);
		});
	});
}

// Record Editing Page
exports.recordEditPage = (req, res, next) => {

	var code = req.params.id;  //extract course code attached to the URL
	
	var query2 = `SELECT * FROM courses WHERE code = "${code}"`;
	dbConn.query(query2, function(error, result){
		if(error)
		{
			console.log(error);
			throw error;
		}
		//res.send ({data: result[0]});
		res.render('pages/edit', {data: result[0]});
	});
}

/* Record Editing Page */
exports.editRecord = (request, response, next) =>{

		code = body.course_code
		title = body.course_title
		desc = body.course_desc
		cat = body.course_cat
		cert = body.certificate
		duration = body.course_dur
		cost = body.course_cost
		img = body.course_img
		 
		var query = `UPDATE courses SET 
						fname = "${first_name}", 
						lname = "${last_name}",  
						gender = "${gender}" 
						WHERE id = "${id}"`;

		database.query(query, function(error, data){

			if(error)
			{
				throw error;
			}
			else
			{
				request.flash('success', 'Sample Data Updated');
				response.redirect('/sample_data');
			}

	});
}

// Record deletion Page
exports.recordDeletePage = (req, res, next) => {
	
	var code = req.params.id; //Get course code to delete
	
	var query3 = `DELETE FROM courses WHERE code = "${code}"`;
	dbConn.query(query3, function(error){

		if(error)
		{
			console.log(error);
			throw error;
		}
		else
		{
			req.flash('success', 'Record has been deleted');
			res.redirect('../display');
		}

	});
}