const {parse} = require('querystring')
const fs = require('fs')
const multer  = require('multer')
const upload = multer({dest:"upload/"})



function collectRequestData(request, callback) {
	const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    const MEDIA = 'multipart/form-data'
	if(request.headers['content-type'] === FORM_URLENCODED) 
    {
	let body = '';
	request.on('data', chunk => {
	body += chunk.toString();
	});
	request.on('end', () => {
	callback(parse(body));
	})
}  else if(request.headers['content-type'] === MEDIA ){
    req.pipe(fs.createWriteStream(''));
}
};

module.exports =  (req,res)=>
{
    if(req.method=="GET")
    {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<!doctype html>
    <html>
    <body>
    <center>
    <form action="/" accept-charset=utf-8 method="post" enctype="multipart/form-data">>
    <input type="text" name="fname" /><br />
    <input type="number" name="age" /><br />
    <input type="file" name="photo" /><br />
    <button>Save</button>
    </form>
    </center>
    </body>
    </html>`);
    }

    else if(req.method=="POST")
    {
        collectRequestData(req, result => {
            console.log(result);
            res.end(`Parsed data belonging to ${result.fname}`);
            });
    } 
}   

    


