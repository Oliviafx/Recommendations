'use strict';

const yelp = require('yelp-fusion');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');
var ls = require('local-storage');
var cookies = require('cookies');


const clientId = 'USLc4bO1jd_WNmHyMtyWeQ';
const clientSecret = 'CgmeETa6k6WbF82MNxaRuBU0rbTuILsTRic8nBcN5brSZdyUddRWKg2AC0Zuud9D';

var app = express();
var upload = multer();
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var temp;

app.post('/search', upload.array(), function(req, res){

	console.log(req.body);

yelp.accessToken(clientId, clientSecret).then(response => {
  	const client = yelp.client(response.jsonBody.access_token);
 	client.search(req.body).then(response => {
   	 const firstResult = response.jsonBody.businesses[0];
   	 console.log(firstResult);
   	 const prettyJson = JSON.stringify(firstResult, null, 4);
   	 temp = prettyJson;
     console.log(prettyJson);
     

     var obj = JSON.parse(prettyJson);



     
  	ls.set("name", obj.name);
     ls.set("phone", obj.phone);
     ls.set("bus_img", obj.image_url);
  	ls.set("lat", obj.coordinates.latitude);
  	ls.set("long", obj.coordinates.longitude);
  	ls.set("rating", obj.rating);
	
  });
}).catch(e => {
  console.log(e);
});
	res.json(temp);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




