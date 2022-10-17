// Control that allows searching the location list and centering the map on a desired location
import SearchAreaList from '../modules/areas.js';
import { leafCoordinate, yx } from '../modules/coords.js';

export var locationSearch = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        var self = this;

        // Create HTML container for the searchbar
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        container.style.background = 'none';
        container.style.width = '150px';
        container.style.height = 'auto';

        // Create the search bar
        var locationInput = L.DomUtil.create('input', 'leaflet-bar leaflet-control leaflet-control-custom', container);
        locationInput.id = 'location-lookup';
        locationInput.type = 'text';
        locationInput.placeholder = "Go to location...";

        // Populate the list of searchable things
        SearchAreaList.fetchLocations(function (locations) {
            var searchableLocationsArray = $.map(locations, function (value, key) {
                return {
                    label: value.name,
                    value: value.pos,
                }
            });
            self.locations = searchableLocationsArray
        });
        // Implement jQuery autocomplete on the HTML item
        $.widget("custom.searchautocomplete", $.ui.autocomplete, {
            _renderItem: function (ul, item) {
                // Apply CSS class (main.css)
                ul.addClass('ui-searchautocomplete')
                return $("<li>")
                    .attr("data-value", item.value)
                    .append("<b>" + item.label + "</b>" + ":<i>(" + item.value[0] + "," + item.value[1] + ")</i>")
                    .appendTo(ul);
            },
        });
        // Attach the autocomplete object to the input object
        $(locationInput).searchautocomplete({
            minLength: 2,
            source: self.locations,
            select: function(event, ui) {
                let targetPoint = yx(leafCoordinate([ui.item.value[0], ui.item.value[1]]))
                // Shift map focus and zoom to something usable
                map.flyTo(targetPoint)
                if (map.getZoom() < 7) {
                    map.flyTo(targetPoint, 8)
                }
                // Prevent the default behavior of select from firing
                // This is better practice than 'return false'
                event.preventDefault()
                // Set the value in the text box to the searched for item
                $("#location-lookup").val(ui.item.label)
            },
        });

        return container;
    },

    onRemove: function () {

    },
})