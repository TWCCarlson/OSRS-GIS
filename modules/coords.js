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

// Wrapper converting LongLat(x,y)[brain coords] to LatLong(y,x)[leaflet coords] for ease
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
    return [x+1152, yMax-y+1215]
}

export { yx, tileCenter, gameCoordinate }