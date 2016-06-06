var map = new GLMap('map', {
    position: { latitude:52.000807, longitude:4.373309 },
    zoom: 16,
	bounds: {
		left: 4.3549,
		top: 52.0099,
		right: 4.3985,
		bottom: 51.9939
	},
    tilt: 35,
    state: false // stores map position/rotation in url
});

var osmb = new OSMBuildings({
    baseURL: './OSMBuildings',
    //maxZoom: 22,
	//maxNativeZoom: 20,
    effects: ['shadows']
}).addTo(map);

osmb.addMapTiles(
    //'https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png',
    'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    {}
);

