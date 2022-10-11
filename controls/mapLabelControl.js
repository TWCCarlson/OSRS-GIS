// Control that builds element for toggling labels of areas and regions on the map
import AreaList from '../modules/areas.js';
import { leafCoordinate, tileCenter, yx } from '../modules/coords.js';
import { CanvasLayer } from '../scripts/L.CanvasLayer.js';

var mapLabelsCanvas = CanvasLayer.extend({
    setData: function (data) {
        this.needRedraw();
    },
    
    onDrawLayer: function (info) {
        var self = this;
        var zoom = this._map.getZoom();
        var context = info.canvas.getContext('2d');
        context.clearRect(0 , 0, info.canvas.width, info.canvas.height)
        // context.clearRect(0, 0,)

        context.textAlign = "center";
        // var areas = new AreaList
        AreaList.fetchLocations(function (locations) {
            for (var i in locations) {
                // console.log(locations[i])
                // console.log(locations[i].name)
                // console.log(info.layer._map.plane)
                // console.log(locations[i].plane == info.layer._map.plane)
                if (locations[i].plane != info.layer._map.plane) {
                    continue
                }

                // Intercept special region names
                if (locations[i].type == "region") {
                    // console.log(locations[i].name + ' is a region, setting special coordinates . . .');
                    // console.log(locations[i].wikilink)

                    switch(locations[i].name) { 
                        case 'Asgarnia':
                            locations[i].pos = leafCoordinate([2997, 3409])
                            break
                    }
                }

                let fontSize;
                let fontColor;

                // Set the font style
                switch (locations[i].type) {
                    case 'default':
                        fontSize = 0.08;
                        fontColor = 'white';
                        break;
                    case 'medium':
                        fontSize = 0.10;
                        fontColor = 'white';
                        break;
                    case 'large':
                        fontSize = 0.18;
                        fontColor = '#ffaa00';
                }

                const fixedScaleZoomLevel = 7
                if (zoom > fixedScaleZoomLevel+5) {
                    const fontSizeScaled = fontSize * Math.pow(2,zoom);
                    context.font = `bold 35px Verdana`;
                } else {
                    const fontSizeScaled = fontSize * Math.pow(2,zoom);
                    context.font = `bold ${fontSizeScaled}px Verdana`;
                }
                context.fillStyle = fontColor
                

                var position = locations[i].pos;
                // console.log(position)
                var textPos = info.layer._map.latLngToContainerPoint(yx(position));

                const name = locations[i].name
                const words = name.split(' ')
                const lines = []

                let line = "";
                // For every word in an area name
                words.forEach(word => { 
                    // If the length of the line with that word added is below a certain value
                    if ((line + word).length < 15) {
                        // And the line isn't empty (such that the word is longer than the certain value)
                        if (line !== "") {
                            // add a space
                            line += " "
                        }
                        // and then the next word
                        line += word
                    } else {
                        // If the line would be longer than the certain value add the line to list
                        lines.push(line);
                        // and add the word to a new line
                        line = word;
                    }
                })
                // If this is the last line (and not empty)
                if (line !== "") {
                    // Add it to the list
                    lines.push(line);
                }
                // console.log(lines)
                
                let y = textPos.y;
                lines.forEach(line => {
                    context.strokeText(line, textPos.x, y);
                    context.fillText(line, textPos.x, y);
                    if (zoom > fixedScaleZoomLevel) {
                        y += 25
                    } else {
                        y += (fontSize + 0.02) * Math.pow(2, zoom)
                    }
                })
            }
        })
        var locdata = AreaList.locations

        
        // locdata = locdata.forEach(x=>console.log(x))

        // for (var i in areas.locations) {
        //     // console.log("test")
        //     // console.log(i)
        //     // console.log(areas.locations[i])
        // }

    }
})

export var MapLabelControl = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        console.log("create pane")
        map.createPane("map-labels");

        // Creates the button container
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control noselect');
        container.style.background = 'none';
        container.style.width = '100px';
        container.style.height = 'auto';

        // Creates the button itself (leaflet-control-custom links to main.css)
        var labelsButton = L.DomUtil.create('a', 'leaflet-bar leaflet-control leaflet-control-custom', container);
        labelsButton.id = 'toggle-map-labels';
        labelsButton.innerHTML = 'Toggle Labels';

        // Assign DOM event to trigger a function
        L.DomEvent.on(labelsButton, 'click', this._toggleMapLabels, this);

        // Enables this whole thing for some reason
        this._enabled = true;
        
        L.DomEvent.disableClickPropagation(container);

        // Builds the layer and assigns it to a named pane for i nteraction
        this._mapLabelsCanvas = new mapLabelsCanvas({ pane: "map-labels" });
        this._map.addLayer(this._mapLabelsCanvas);

        // Handle multiple planes
        map.on('planeChanged', function () {
            this._mapLabelsCanvas.drawLayer();
        }, this);

        return container;
    },

    _toggleMapLabels: function () {
        if (this._enabled) {
            console.log('enable')
            this._map.getPane("map-labels").style.display = "none";
            this._enabled = false;
        } else {
            console.log('disable')
            this._map.getPane("map-labels").style.display = "";
            this._enabled = true;
        }
    }
})