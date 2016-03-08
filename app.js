"use strict";

var polyline = require('polyline'),
request = require("request"),

directions = {
    'origin': [-0.280422, -78.533411],
    'destination': [-0.258665, -78.522554]
}


request("https://maps.googleapis.com/maps/api/directions/json?origin=" + directions.origin[0] + "," + directions.origin[1] + "&destination=" + directions.destination[0] + "," + directions.destination[1], function (error, response, body) {
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