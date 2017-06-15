var express = require('express'); 
var request = require('request'); 
var cors = require('cors')
var app = express();
app.use(allowCrossDomain);

app.use(cors())

var myParser = require("body-parser");
//support parsing of application/json type post data
app.use(myParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(myParser.urlencoded({ extended: true }));


var options = {
 // url: 'http://api.yelp.com/v3/businesses/search?categories=restaurants&latitude=37.786882&longitude=-122.399972',
  headers: {
    'Authorization': 'bearer RT2S0q88HosnKEJrds-Lbe5EhebLejgURB7JzQeK7lC_qNI_PCQL4XuR5yE7YfIcdX_GfDf9H7kwI44cyRf855v71v67Gpkue-ZjgoQTBJyDtL_7YJKxHPUsRkk4WXYx'
  }
};

// app.use(myParser.urlencoded({extended : true}));
//    app.post("/getRestaurants", function(request, response) {
//        console.log(request.body);
//  });


// app.get('/api', function(req, res){ 
//   request(options, function (error, response, body) { 
//     if (!error && response.statusCode === 200) { 
//       console.log(body); 
//       res.send(body); 
//     } 
//    }); 
// });

// app.get('/', function(req, res) {
//   res.send("long is set to " + 'req.params.location');
// });

app.get('/:location', function(req, res){
  console.log(req.params.location) 
  request('https://api.yelp.com/v3/businesses/search?categories=restaurants&' + req.params.location, options, 
  function (error, response, body) { 
    if (!error && response.statusCode === 200) { 
      console.log(body); 
      res.send(body); 
    } 
   }); 
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

//app.listen(3000);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
