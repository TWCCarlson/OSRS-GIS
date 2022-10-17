import { yx, tileCenter, gameCoordinate } from './coords.js';


// Grid debugger
function drawDebugTileGrid(map) {
    L.GridLayer.DebugCoords = L.GridLayer.extend({
        createTile: function (coords) {
            var tile = document.createElement('div');
            tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');
            tile.style.outline = '1px solid red';
            tile.style.color = 'white';
            return tile;
        }
        });
        
    L.gridLayer.debugCoords = function(opts) {
        return new L.GridLayer.DebugCoords(opts);
    };
        
    map.addLayer(L.gridLayer.debugCoords({
        // bounds: [[0, 0], [imageSize - 1, imageSize - 1]]
    }));

    return map
}

function drawDebugROI(map, cornerA, cornerB) {
    let rect = L.rectangle([yx(cornerA), yx(cornerB)], {color: "#ff7800", weight: 1}).bindPopup('test').addTo(map);
    // rect.on('click', debug);
    return map
}

function placeDebugMarker(map, point, string) {
    var marker = L.marker(tileCenter(yx(point))).addTo(map);
    marker.bindPopup('<b>' + string + ': <b>' + gameCoordinate(point)).openPopup();
    return map
}

// Displays Pixel coordinates and latlng (in CRS.Simple latlng === game tile coordinates)
function displayDebugCoordinates(map) {
    // Make space for the coordinates
    document.getElementById("map").style.height = "98%"
    map.on('mousemove', function(event) {
        var coords = event.latlng;
        document.getElementById('coordinates').innerHTML = 'Px: ' + map.project(coords) + ' x = ' + Math.floor(coords.lng) + ', y = ' + Math.floor(coords.lat) 
            + ' // Game Coordinates:' + gameCoordinate([Math.floor(coords.lng), Math.floor(coords.lat)]);
    });
    return map
}

var debug = function(e) {
    console.log("test")
}

export { drawDebugTileGrid, drawDebugROI, placeDebugMarker, displayDebugCoordinates }