import { xMax, yMax, boundPad } from './modules/constrefs.js';
import { drawDebugTileGrid, drawDebugROI, placeDebugMarker, displayDebugCoordinates } from './modules/debug.js';
import { yx, tileCenter, gameCoordinate, leafCoordinate } from './modules/coords.js';
import AreaList from './modules/areas.js';
import { MapLabelControl } from './controls/mapLabelControl.js';
// Fix marker rendering
// L.Icon.Default.imagePath = './scripts/images/'
// Image dimensions at maximum zoom (pixels/32) (x,y)
const imageNW = [0, 0];
const imageNE = [xMax, 0];
const imageSW = [0, yMax];
const imageSE = [xMax, yMax];

// Custom CRS
// 8 game units per tile at Zoom 11 -> 256/8 = 64
L.CRS.myCRS = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1/64, 0, 1/64, 0),
});

// Insert a map container
var map = L.map('map', {
    crs: L.CRS.myCRS,
    center: [0,0],
    zoom: 4,
    minZoom: 1,
    maxZoom: 11,
    renderer: L.canvas()
})
map.plane = 0

// Set map boundaries and prevent user scrolling beyond them 
var boundsPadded = new L.latLngBounds(
    yx([imageNW[0]-boundPad,imageNW[1]-boundPad]), 
    yx([imageSE[0]+boundPad,imageSE[1]+boundPad]),
)
map.setMaxBounds(boundsPadded)

// Add controls to the map
map.addControl(new MapLabelControl())

// Set tile layer boundaries to avoid excessive 404's
var bounds = new L.latLngBounds(
    yx([imageNW[0],imageNW[1]]), 
    yx([imageSE[0],imageSE[1]]),
)

// Place tiles
var tiles = L.tileLayer('https://raw.githubusercontent.com/TWCCarlson/OSRS-GIS-maptiles/master/0/{z}/0/{y}/{x}.png', {
    bounds: bounds,
    minZoom: 1,
    maxZoom: 11,
}).addTo(map);

drawDebugTileGrid(map);
// drawDebugROI(map, imageSE, imageNW);
displayDebugCoordinates(map)

placeDebugMarker(map, leafCoordinate([3037, 3372]), 'fally ref')
placeDebugMarker(map, leafCoordinate([3091, 3488]), 'edge ref')
placeDebugMarker(map, leafCoordinate([2609, 3088]), 'yanille ref')

placeDebugMarker(map, imageNW, 'NW');
placeDebugMarker(map, imageNE, 'NE');
placeDebugMarker(map, imageSW, 'SW');
placeDebugMarker(map, imageSE, 'SE');

// TODO: labels
// TODO: hovered tile highlight
// TODO: floating coordinate display
// TODO: json ingest