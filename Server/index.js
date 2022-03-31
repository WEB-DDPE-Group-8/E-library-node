let  http = require('http');
let handler = require('./Handler/handler')

var server = http.createServer(handler);
server.listen(8000);