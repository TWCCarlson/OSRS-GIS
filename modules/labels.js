function setLabelOpacityFromZoom(map, type, interaction) {
    let curZoom = map.getZoom();
    let Opacity = 0
    if (interaction == 'off') {
        switch (curZoom) {
            case 1:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 2:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 3:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 4:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 5:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 6:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 7:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 1}
                break;
            case 8:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 1}
                break;
            case 9:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 1}
                break;
            case 10:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 1}
                break;
            case 11:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 1}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 1}
                break;
        }
        return Opacity
    } else if (interaction == 'on') {
        switch (curZoom) {
            case 1:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 2:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 3:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 4:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 5:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 6:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0}
                break;
            case 7:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0.25}
                break;
            case 8:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0.25}
                break;
            case 9:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0.25}
                break;
            case 10:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0.25}
                break;
            case 11:
                if (type.includes('leaflet-tooltip-region')) {Opacity = 0}
                if (type.includes('leaflet-tooltip-area')) {Opacity = 0.25}
                if (type.includes('leaflet-tooltip-poi')) {Opacity = 0.25}
                break;
        }
        return Opacity
    }
    
}

export { setLabelOpacityFromZoom }