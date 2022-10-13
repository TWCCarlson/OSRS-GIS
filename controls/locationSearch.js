// Control that allows searching the location list and centering the map on a desired location

export var locationSearch = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function() {
        var self = this;
        var searchList = [];

        // Create HTML container for the searchbar
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        container.style.background = 'none';
        container.style.width = '100px';
        container.style.height = 'auto';

        // Create the search bar
        var locationInput = L.DomUtil.create('input', 'leaflet-bar leaflet-control leaflet-control-custom', container);
        locationInput.id = 'location-lookup';
        locationInput.type = 'text';
        locationInput.placeholder = "Go to location";

        $.getJSON("lists/osrs-location-list.json", function(areaList) {
            for  (let i=0; i<areaList.length; i++) {
                searchList.push({label:areaList[i].locName, value:""})
            }
        });

        return container;
    },

    onRemove: function() {

    },
})