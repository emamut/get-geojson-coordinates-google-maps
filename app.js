"use strict";

var polyline = require('polyline'),
request = require("request"),
prompt = require('prompt');

prompt.start();

prompt.get(['origin', 'destination'], function (err, result) {
    if (err) { return onErr(err); }
    request("https://maps.googleapis.com/maps/api/directions/json?origin=" + result.origin + "&destination=" + result.destination, function (error, response, body) {
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

        console.log(JSON.stringify(coordinates));
    });
});

function onErr(err) {
    console.log(err);
    return 1;
}