// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var exec	   = require('child_process').exec;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/run', function(req, res) {
	var decodedAlgo = new Buffer(req.param('algo'), 'base64').toString('utf-8');
	decodedAlgo = decodedAlgo.replace(/\"/g, '\\"');
	exec('docker run node node -e "' + decodedAlgo + '"', function(err, stdout, stderr) {
		res.json({
			results: stdout,
			errors: stderr,
			algo: decodedAlgo
		});
	});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
