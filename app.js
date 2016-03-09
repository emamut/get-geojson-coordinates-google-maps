"use strict";

var polyline = require('polyline'),
request = require("request"),
app = require("express")(),
bodyParser = require('body-parser'),
fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/response', function (req, res) {
    request("https://maps.googleapis.com/maps/api/directions/json?origin=" + req.body.origin + "&destination=" + req.body.destination, function (error, response, body) {
        body = JSON.parse(body);
        var coordinates = {};
        coordinates.type = "LineString";

        coordinates.coordinates = polyline.decode(body.routes[0].overview_polyline.points);
        for(var cont = 0; cont < coordinates.coordinates.length; cont++) {
            var temp;
            temp = coordinates.coordinates[cont][0];
            coordinates.coordinates[cont][0] = coordinates.coordinates[cont][1];
            coordinates.coordinates[cont][1] = temp;
        }

        // res.setHeader('Content-Type', 'application/json');
        res.send(coordinates);
    });
});

app.get('/', function (request, response) {
    fs.readFile('index.html', function(err, page) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(page);
        response.end();
    });
});

app.listen(3000, function () {
    console.log('Open in your browser http://localhost:3000');
});