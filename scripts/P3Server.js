const express = require('express');
const conceptJson = require('./conceptjson');

const server = express();

const PORT = process.env.PORT || 1090; 

// ALWAYS HAVE THIS SECTION
//
// Enable recognition of incoming data as JSON
server.use(express.json());
// Enable incoming values in name:value pairs to be either:
// - string or array (false)
// - any type (true)
server.use(express.urlencoded({ extended: true }));

// Set up allowance characteristics for cross-origin resource sharing (CORS)
// The default is the original domain is the sole source, but CORS allows
// mutilple domains to be a source in a secure manner.
var allowCrossDomain = function (req, res, next) {
  // allows all domains to be a source
  res.header("Access-Control-Allow-Origin", "*");
  // allows all 4 methods to be used, rather than just GET and POST
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // only allow headers with "Content-Type" in the JSON name field
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // pass control to the next middleware function, else request is left hanging
  next();
};
server.use(allowCrossDomain);

server.get("/concepts", function (req, res) {
  res.json(conceptJson);
});


// listen for activity at port 3526
server.listen(PORT, ()=> {
  console.log(`Example app listening on port ${PORT}`);
});





