// Control that builds element for toggling labels of areas and regions on the map
import AreaList from '../modules/areas.js';
import { leafCoordinate, tileCenter, yx } from '../modules/coords.js';
import { CanvasLayer } from '../scripts/L.CanvasLayer.js';
import { setLabelOpacityFromZoom } from '../modules/labels.js';

export var mapLabelControl = L.Control.extend({
    onAdd: function(map) {
        // Create a layer for the labels to exist on
        var labelPane = map.createPane('labelPane')
        // Grab the list of locations
        // AreaList.js has export new AreaList, so no need to create a new instance
        var tooltipList = []
        AreaList.fetchLocations(function (locations) {
            for (var i in locations) {
                // Parse them to determine the style
                // Check that the POI lies on the same plane that is being displayed
                if (locations[i]['plane'] != map.plane) {
                    // console.log('not on current plane, skip')
                    continue
                }
                
                // Set the marker style based on the location data
                let toolTipClass
                switch (locations[i].type) {
                    case 'large':
                        // AKA "region"
                        toolTipClass = 'leaflet-tooltip-region'
                        break
                    case 'medium': 
                        // AKA "area"
                        toolTipClass = 'leaflet-tooltip-area'
                        break
                    case 'default':
                        // AKA "poi"
                        toolTipClass = 'leaflet-tooltip-poi'
                        break
                }

                // Generate markers for each according to the style
                var tooltip = L.tooltip(yx(locations[i].pos), {
                    content: '<b>'+locations[i]['name']+'</b>',
                    pane: 'labelPane',
                    direction: 'center',
                    opacity: (toolTipClass=='leaflet-tooltip-region' ? 1 : 0),
                    permanent: true,
                    className: toolTipClass,
                    interactive: true
                }).addTo(map)

                tooltipList.push(tooltip)
            }

            tooltipList.forEach(function(tooltip) {
                // Add an event that listens for `mouseover` to fade the label a bit
                tooltip.addEventListener('mouseover', function() {
                    tooltip.getElement().style.opacity = setLabelOpacityFromZoom(map, tooltip.getElement().className, 'on')
                });
    
                tooltip.addEventListener('mouseout', function () {
                    tooltip.getElement().style.opacity = setLabelOpacityFromZoom(map, tooltip.getElement().className, 'off')
                });

                tooltip.addEventListener('dblclick', function () {
                    // console.log(tooltip.getElement().innerText)
                    window.open("https://oldschool.runescape.wiki/w/"+tooltip.getElement().innerText)
                });
            })
        })

        map.on('zoomend', function () {
            var zoomLevel = map.getZoom();
            var regionTooltip = $('.leaflet-tooltip-region');
            var areaTooltip = $('.leaflet-tooltip-area')
            var poiTooltip = $('.leaflet-tooltip-poi')
        
            switch (zoomLevel) {
                case 1:
                    // No labels visible
                    regionTooltip.css('opacity', 0);
                    areaTooltip.css('opacity', 0);
                    poiTooltip.css('opacity', 0);
                    break;
                case 2:
                    // No labels visible
                    regionTooltip.css('font-size', 7);
                    regionTooltip.css('opacity', 0);
                    areaTooltip.css('font-size', 7);
                    areaTooltip.css('opacity', 0);
                    poiTooltip.css('font-size', 7);
                    poiTooltip.css('opacity', 0);
                    break;
                case 3:
                    // No labels visible
                    regionTooltip.css('font-size', 7);
                    regionTooltip.css('opacity', 0);
                    areaTooltip.css('font-size', 7);
                    areaTooltip.css('opacity', 0);
                    poiTooltip.css('font-size', 7);
                    poiTooltip.css('opacity', 0);
                    break;
                case 4:
                    // Only region labels visible
                    regionTooltip.css('font-size', 12);
                    regionTooltip.css('opacity', 1);
                    areaTooltip.css('font-size', 12);
                    areaTooltip.css('opacity', 0);
                    poiTooltip.css('font-size', 12);
                    poiTooltip.css('opacity', 0);
                    break;
                case 5:
                    // Only region labels visible
                    regionTooltip.css('font-size', 14);
                    regionTooltip.css('opacity', 1);
                    areaTooltip.css('font-size', 7);
                    areaTooltip.css('opacity', 0);
                    poiTooltip.css('font-size', 7);
                    poiTooltip.css('opacity', 0);
                    break;
                case 6:
                    // Region and area labels visible
                    regionTooltip.css('font-size', 16);
                    regionTooltip.css('opacity', 1);
                    areaTooltip.css('font-size', 8);
                    areaTooltip.css('opacity', 1);
                    poiTooltip.css('font-size', 7);
                    poiTooltip.css('opacity', 0);
                    break;
                case 7:
                    // All visible, region stops growing here
                    regionTooltip.css('font-size', 18);
                    regionTooltip.css('opacity', 1);
                    areaTooltip.css('font-size', 10);
                    areaTooltip.css('opacity', 1);
                    poiTooltip.css('font-size', 10);
                    poiTooltip.css('opacity', 1);
                    break;
                case 8:
                    regionTooltip.css('font-size', 18);
                    regionTooltip.css('opacity', 1);
                    areaTooltip.css('font-size', 12);
                    areaTooltip.css('opacity', 1);
                    poiTooltip.css('font-size', 10);
                    poiTooltip.css('opacity', 1);
                    break;
                case 9:
                    regionTooltip.css('font-size', 18);
                    regionTooltip.css('opacity', 0);
                    areaTooltip.css('font-size', 14);
                    areaTooltip.css('opacity', 1);
                    poiTooltip.css('font-size', 12);
                    poiTooltip.css('opacity', 1);
                    break;
                case 10:
                    // Region no longer visible
                    regionTooltip.css('font-size', 18);
                    regionTooltip.css('opacity', 0);
                    areaTooltip.css('font-size', 14);
                    areaTooltip.css('opacity', 1);
                    poiTooltip.css('font-size', 12);
                    poiTooltip.css('opacity', 1);
                    break;
                case 11:
                    // Region not visible
                    regionTooltip.css('font-size', 18);
                    regionTooltip.css('opacity', 0);
                    areaTooltip.css('font-size', 14);
                    areaTooltip.css('opacity', 1);
                    poiTooltip.css('font-size', 12);
                    poiTooltip.css('opacity', 1);
                    break;
            }
        });

        // Return the HTML object that allows toggling of the labels
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control noselect');
        container.style.background = 'none';
        container.style.width = '100px';
        container.style.height = 'auto';

        // Creates the button itself (leaflet-control-custom links to main.css)
        var labelsButton = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom', container);
        labelsButton.id = 'toggle-map-labels';
        labelsButton.innerHTML = '<b>Toggle Labels</b>';

        // Assigns DOM event listener for clicks on the button
        L.DomEvent.on(labelsButton, 'click', this._toggleMapLabels, this);
        L.DomEvent.disableClickPropagation(container);

        // State tracker
        this._enabled = false
        // Default on
        this._toggleMapLabels()

        return container
    },

    onRemove: function() {
        // Shouldn't be used for now
    },

    _toggleMapLabels: function () {
        // Alternate between the labels being active (default) and disabled
        if (this._enabled == false) {
            this._map.getPane("labelPane").style.display = "";
            this._enabled = true;
        } else {
            this._map.getPane("labelPane").style.display = "none";
            this._enabled = false;
        }
    }
})















// var mapLabelsCanvas = CanvasLayer.extend({
//     setData: function (data) {
//         this.needRedraw();
//     },
    
//     onDrawLayer: function (info) {
//         var self = this;
//         var zoom = this._map.getZoom();
//         var context = info.canvas.getContext('2d');
//         context.clearRect(0 , 0, info.canvas.width, info.canvas.height)
//         // context.clearRect(0, 0,)

//         context.textAlign = "center";
//         // var areas = new AreaList
//         AreaList.fetchLocations(function (locations) {
//             for (var i in locations) {
//                 // console.log(locations[i])
//                 // console.log(locations[i].name)
//                 // console.log(info.layer._map.plane)
//                 // console.log(locations[i].plane == info.layer._map.plane)
//                 if (locations[i].plane != info.layer._map.plane) {
//                     continue
//                 }

//                 // Intercept special region names
//                 if (locations[i].type == "region") {
//                     // console.log(locations[i].name + ' is a region, setting special coordinates . . .');
//                     // console.log(locations[i].wikilink)

//                     switch(locations[i].name) { 
//                         case 'Asgarnia':
//                             locations[i].pos = leafCoordinate([2997, 3409])
//                             break
//                     }
//                 }

//                 let fontSize;
//                 let fontColor;

//                 // Set the font style
//                 switch (locations[i].type) {
//                     case 'default':
//                         fontSize = 0.08;
//                         fontColor = 'white';
//                         break;
//                     case 'medium':
//                         fontSize = 0.10;
//                         fontColor = 'white';
//                         break;
//                     case 'large':
//                         fontSize = 0.18;
//                         fontColor = '#ffaa00';
//                 }

//                 const fixedScaleZoomLevel = 7
//                 if (zoom > fixedScaleZoomLevel+5) {
//                     const fontSizeScaled = fontSize * Math.pow(2,zoom);
//                     context.font = `bold 35px Verdana`;
//                 } else {
//                     const fontSizeScaled = fontSize * Math.pow(2,zoom);
//                     context.font = `bold ${fontSizeScaled}px Verdana`;
//                 }
//                 context.fillStyle = fontColor
                

//                 var position = locations[i].pos;
//                 // console.log(position)
//                 var textPos = info.layer._map.latLngToContainerPoint(yx(position));

//                 const name = locations[i].name
//                 const words = name.split(' ')
//                 const lines = []

//                 let line = "";
//                 // For every word in an area name
//                 words.forEach(word => { 
//                     // If the length of the line with that word added is below a certain value
//                     if ((line + word).length < 15) {
//                         // And the line isn't empty (such that the word is longer than the certain value)
//                         if (line !== "") {
//                             // add a space
//                             line += " "
//                         }
//                         // and then the next word
//                         line += word
//                     } else {
//                         // If the line would be longer than the certain value add the line to list
//                         lines.push(line);
//                         // and add the word to a new line
//                         line = word;
//                     }
//                 })
//                 // If this is the last line (and not empty)
//                 if (line !== "") {
//                     // Add it to the list
//                     lines.push(line);
//                 }
//                 // console.log(lines)
                
//                 let y = textPos.y;
//                 lines.forEach(line => {
//                     context.strokeText(line, textPos.x, y);
//                     context.fillText(line, textPos.x, y);
//                     if (zoom > fixedScaleZoomLevel) {
//                         y += 25
//                     } else {
//                         y += (fontSize + 0.02) * Math.pow(2, zoom)
//                     }
//                 })
//             }
//         })
//         var locdata = AreaList.locations

        
//         // locdata = locdata.forEach(x=>console.log(x))

//         // for (var i in areas.locations) {
//         //     // console.log("test")
//         //     // console.log(i)
//         //     // console.log(areas.locations[i])
//         // }

//     }
// })

// export var MapLabelControl = L.Control.extend({
//     options: {
//         position: 'topleft'
//     },

//     onAdd: function (map) {
//         console.log("create pane")
//         map.createPane("map-labels");

//         // Creates the button container
//         var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control noselect');
//         container.style.background = 'none';
//         container.style.width = '100px';
//         container.style.height = 'auto';

//         // Creates the button itself (leaflet-control-custom links to main.css)
//         var labelsButton = L.DomUtil.create('a', 'leaflet-bar leaflet-control leaflet-control-custom', container);
//         labelsButton.id = 'toggle-map-labels';
//         labelsButton.innerHTML = 'Toggle Labels';

//         // Assign DOM event to trigger a function
//         L.DomEvent.on(labelsButton, 'click', this._toggleMapLabels, this);

//         // Enables this whole thing for some reason
//         this._enabled = true;
        
//         L.DomEvent.disableClickPropagation(container);

//         // Builds the layer and assigns it to a named pane for i nteraction
//         this._mapLabelsCanvas = new mapLabelsCanvas({ pane: "map-labels" });
//         this._map.addLayer(this._mapLabelsCanvas);

//         // Handle multiple planes
//         map.on('planeChanged', function () {
//             this._mapLabelsCanvas.drawLayer();
//         }, this);

//         return container;
//     },

//     _toggleMapLabels: function () {
//         if (this._enabled) {
//             console.log('enable')
//             this._map.getPane("map-labels").style.display = "none";
//             this._enabled = false;
//         } else {
//             console.log('disable')
//             this._map.getPane("map-labels").style.display = "";
//             this._enabled = true;
//         }
//     }
// })