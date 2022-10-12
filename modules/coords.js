import { yMax } from './constrefs.js';

// Wrapper converting LongLat(x,y)[brain coords] to LatLong(y,x)[leaflet coords] for ease
var yx = function(x, y) {
    // If the input is an array
    if (L.Util.isArray(x)) {
        return ([x[1], x[0]]);
    }
    // If the input is a tuple
    return (y,x);
}

// Wrapper converting LatLong(y,x)[leaflet coords] to LongLat(x,y)[brain coords] for ease
var xy = function(y, x) {
    // If the input is an array
    if (L.Util.isArray(y)) {
        return ([y[1], y[0]]);
    }
    // If the input is a tuple
    return (x,y);
}

// Useful for markers
var tileCenter = function(x,y) {
    // If the input is an array
    if (L.Util.isArray(x)) {
        return ([x[0]+0.5, x[1]+0.5]);
    }
    // If the input is a tuple
    return (x+0.5,y+0.5);
}

// Convert from LongLat(x,y) to OSRS game coordinate system
// This is just a shifting transformation
var gameCoordinate = function(x,y) {
    // If the input is an array
    if (L.Util.isArray(x)) {
        return ([x[0]+1152, yMax-x[1]+1215]);
    }
    // If the input is a tuple
    return ([x+1152, yMax-y+1215])
}

var leafCoordinate = function(x,y) {
    // If the input is an array
    // OUTPUT IS NOT SWAPPED X<->Y, DO THIS WITHIN OTHER FUNCS TO MAKE DEBUG SIMPLER
    if (L.Util.isArray(x)) {
        return ([x[0]-1152, yMax-x[1]+1215])
    }
    // If the input is a tuple
    return ([x-1152, yMax+y-1215])
}

var highlightMouseTile = function(map, oldMousePosition, tileHighlight) {
    map.on('mousemove', function(ev) {
        var mousePosition = gameCoordinate(xy([Math.floor(ev.latlng.lat), Math.floor(ev.latlng.lng)]))
        if (oldMousePosition != mousePosition) {
            // Record the position
            oldMousePosition = mousePosition
            
            // Remove the old rectangle
            if (tileHighlight !== undefined) {
                map.removeLayer(tileHighlight)
            }
            // console.log(mousePosition)
            var tileBounds = [yx(leafCoordinate(mousePosition)), yx(leafCoordinate([mousePosition[0]+1, mousePosition[1]-1]))]
            // console.log(tileBounds)
            tileHighlight = new L.rectangle(tileBounds, {
                color: "#2c8bd4",
                fillColor: "#2c8bd4",
                fillOpacity: 0.5,
                weight: 2,
            }).addTo(map)
        }
    })
}

export { yx, xy, tileCenter, gameCoordinate, leafCoordinate, highlightMouseTile }