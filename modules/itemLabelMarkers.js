import { leafCoordinate, yx, tileCenter } from '../modules/coords.js';
// Define the custom marker icon
var itemLabelIcon = L.Icon.extend({
    options: {
        iconUrl: '../scripts/images/item-marker-icon.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, 0]
    }
});

var itemIcon = new itemLabelIcon({})

var f2pItemMarkers = function(map) {
    var f2pItemLayerGroup
    // Pull the data
    $.ajax({
        url: "lists/f2p-item-list.json",
        dataType: "json",
        context: this,
        async: false,
        success: function(data) {
            let locations = []
            let itemMarkers = []
            // Append the data 
            for (var i in data) {
                locations.push({
                    "name": data[i].itemName,
                    "pos": leafCoordinate([data[i].X, data[i].Y]),
                    "wikilink": data[i].itemPageLink,
                    "plane": data[i].Z,
                })
            }
            for (let j in locations) {
                let cornerNW = yx([locations[j].pos[0], locations[j].pos[1]])
                let cornerSE = [cornerNW[0]+1, cornerNW[1]+1]
                // The idiots at leaflet don't know how to make rectangles clickable I guess
                // let itemMarker = L.rectangle([cornerNW, cornerSE], {color: '#fdb23d', weight: 5})
                let itemMarker = L.marker(tileCenter(cornerNW), {icon: itemIcon})
                itemMarker.bindPopup('<b>' + locations[j].name + '</b> <i>(Height:' + locations[j].plane + ')</i>')
                // var itemPopup = L.popup(tileCenter(cornerNW), {content: '<b>' + locations[j].name + '</b> <i>(Height:' + locations[j].plane + ')</i>'}).openOn(map)
                // itemMarker.bindPopup(itemPopup)
                // L.DomEvent.on(itemMarker, 'click', debug, itemMarker);
                // itemMarker.on('click', debug);
                // console.log(itemMarker)
                // itemMarker.addTo(map)
                itemMarkers.push(itemMarker)
            }
            f2pItemLayerGroup = new L.layerGroup(itemMarkers)
            // itemMarkers.addTo(f2pItemLayerGroup)
        }
    })
    map.on('zoomend', function() {
        let currentZoom = map.getZoom();
        console.log(currentZoom)
        f2pItemLayerGroup.eachLayer(function(layer) {
            let icon = layer.options.icon
            console.log(layer.options)
            icon.options.iconSize = [Math.ceil(32/((11-currentZoom)*2)), Math.ceil(32/((11-currentZoom)*2))]
            icon.options.iconAnchor = [Math.ceil(16/((11-currentZoom)*2)), Math.ceil(16/((11-currentZoom)*2))]
            console.log(layer.options)
            console.log("fuck off retard")
            layer.setIcon(icon)
        })   
    })
    return f2pItemLayerGroup
}

var debug = function(e) {
    console.log("test")
}

export {f2pItemMarkers}