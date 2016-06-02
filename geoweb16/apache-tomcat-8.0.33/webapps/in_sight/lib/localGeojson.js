function popUp2(f,l){
    var out = [];
    if (f.properties){
        for(key in f.properties){
            out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
    }
}


function CreGeojsonLayer(styleParams, jsonInput) {
    var geojson = L.geoJson(null, {
        style: styleParams,
        onEachFeature: popUp2
    });

    //console.log(json);
    geojson.addData(jsonInput);
    console.log(geojson.getLayers().length);
 
    return geojson;

}


function CreGeojsonCircleLayer(markerOptions, jsonInput) {
    var geojson = L.geoJson(null, {
        onEachFeature: popUp2,
        pointToLayer: function (feature, latlng) {
						return L.circleMarker( latlng, markerOptions );
					}
        
    });

    //console.log(jsonInput);
    geojson.addData(jsonInput);
    console.log(geojson.getLayers().length);
 
    return geojson;

}