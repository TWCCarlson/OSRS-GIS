import { leafCoordinate } from "./coords.js";

class Areas {
    // Holds a list of all areas being considered by the leafmap
    constructor() {
        this.locations = [];
    }

    // This is run automatically because it isn't really declared as a function
    // This does not: fetch = function fetchLocations() {
    fetchLocations(callback) {
        if (this.locations.length > 0) {
            // If the locations prop has items in it, the list has already been built
            callback(this.locations);
            return
        }

        // Otherwise, build it from the .json
        // I think we use AJAX because this data changes? not sure
        // Make sure this is done synchronously otherwise a race condition is introduced
        $.ajax({
            url: "lists/osrs-location-list.json",
            dataType: "json",
            context: this,
            async: false,
            success: function(data) {
                var locations = data;
                // Append the data 
                for (var i in locations) {
                    this.locations.push({
                        "name": locations[i].locName,
                        "pos": leafCoordinate([locations[i].X, locations[i].Y]),
                        "type": locations[i].type,
                        "wikilink": locations[i].locPageLink,
                        "plane": Number(locations[i].Z)
                    })
                }
                callback(this.locations)
            }
        })
    }
}

export default (new Areas)