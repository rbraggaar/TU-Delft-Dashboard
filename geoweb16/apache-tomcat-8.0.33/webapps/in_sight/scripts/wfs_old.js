// WFS SOURCE
var url = 'http://localhost:8080/geoserver/synthesis/ows?';
var counter = 0;

var geomType = 'g01_newcampusgeom';
function editGeomType(type){        //g01_newcampusgeom or g01_centerpointbuffers
    geomType=type;
    sl1(timeRequest);
}
// LAYERS ADDED TO THE MAP
var mapLayers;

// SL SPECIFIC INFORMATION
var campusData;
var buildingData;
var floorData;

// STORE OBJECT INFORMATION
var buildings_json;
var colorvalue;

// CAMPUS (SL0) ////////////////////////////////////////////////////////////////////////////////////////////////////////
var sl0 = function () {
	console.log('counter'+counter);
	if (counter >= 1){
		clearr();
	} else {
		counter += 1;
	}
	document.getElementById("geomtype").style.visibility = "hidden";

    // STATISTICAL DATA
    var params0 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params0 += 'typeName=synthesis:g01_sl0_oeh&';
        params0 += 'propertyName=datum,l_hour,occupation,exploitation&';
        //params0 += 'cql_filter=datum\=\'2016-04-01\'';
        params0 += 'cql_filter=datum\=\''+selectedDate+'\'';
        //console.log(params0)

	// LOAD DATA
	var validJson0;
	var chartData0 = GetFeatureWFS( url, params0, function(validJson0) {
        campusData = validJson0;
	});

    // LOAD DATA TO CHART
    setTimeout(function(){setData1(campusData);/*console.log(campusData)*/}, 3000);

	// DELAY GEOMETRY LOAD
    setTimeout(function(){
        // REQUEST REALISTIC GEOMETRY
        var params1 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
            params1 += 'typeName=synthesis:g01_newcampusgeom&';
            params1 += 'propertyName=geom,buildingid,height&';

        // LOAD GEOMETRY
        var validJson1;
        var osm_buildings_Delft = GetFeatureWFS(url, params1, function(validJson1) {
            buildings_json = validJson1;

            // Color Geometry
            for (var key in buildings_json.features){
                for (var index in campusData.features){
                   if (campusData.features[index].properties['l_hour'] == '12:00:00Z'){
                        colorvalue = coloring((campusData.features[index].properties['exploitation']),buildingcolors);
                    }
                }
            buildings_json.features[key].properties.color = colorvalue;
            buildings_json.features[key].properties.roofColor = colorvalue;
            }
        
		myData  = osmb.addGeoJSON(validJson1);
		
        }) ;
     }, 500);
};

// FACULTY (SL1) ///////////////////////////////////////////////////////////////////////////////////////////////////////
var sl1 = function () {
    clearr();
    sl = 1;
    console.log("sl1")
    setData1(sl);
	document.getElementById("geomtype").style.visibility = "visible";
// LOAD STATISTICAL DATA
    var params2 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params2 += 'typeName=synthesis:g01_sl1_oeh&';
        params2 += 'propertyName=buildingid,datum,l_hour,occupation,exploitation&';
        params2 += 'cql_filter=datum\=\''+selectedDate+'\'';

    // LOAD DATA
    var validJson2;
    var chartData2 = GetFeatureWFS(url, params2, function(validJson2) {           //edditen 1-6-2016
        buildingData = validJson2;
    });

    // DELAY GEOMETRY LOAD
    setTimeout(function(){
        // REQUEST CILINDER GEOMETRY
         var param3;
         if (geomType == 'g01_centerpointbuffers'){
             params3 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
             params3 += 'typeName=synthesis:'+geomType+'&';
             params3 += 'propertyName=geom,buildingid,height,part&';
         }
         else{
             params3 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
             params3 += 'typeName=synthesis:'+geomType+'&';
             params3 += 'propertyName=geom,buildingid,height&';

         }

	setTimeout(function(){
        var validJson3;
        var osm_buildings_Delft = GetFeatureWFS(url, params3, function(validJson3) {
					buildings_json = validJson3;

        for (var key in buildings_json.features){
                colorvalue = '#999999'
                for (var index in buildingData.features){
                    if (buildings_json.features[key].properties['buildingid'] == buildingData.features[index].properties['buildingid']
                        && buildingData.features[index].properties['l_hour'] == '06:00:00Z'){
                        colorvalue = coloring(buildingData.features[index].properties['exploitation'],buildingcolors);
                            if (geomType == 'g01_centerpointbuffers' && buildings_json.features[key].properties['part']==2){
								buildings_json.features[key].properties['height'] = (14.4/(parseInt(buildingData.features[index].properties['exploitation'])))*100;
							}
							else if (geomType == 'g01_centerpointbuffers' && buildings_json.features[key].properties['part']==1){
								buildings_json.features[key].properties['height'] = 100;
							};
                    }
                    else {
                    }
                    if (geomType == 'g01_centerpointbuffers' && buildings_json.features[key].properties['part']==1){
						buildings_json.features[key].properties.roofColor = '#999999';
						buildings_json.features[key].properties.color = '#999999';
					}
					else{
						buildings_json.features[key].properties.roofColor = colorvalue;
						buildings_json.features[key].properties.color = colorvalue;
					}
                }
            }
                    myData = osmb.addGeoJSON(validJson3);
        });
    });
	},500)
}

// FLOOR (SL2) /////////////////////////////////////////////////////////////////////////////////////////////////////////
var sl2 = function () {
    clearr();
	document.getElementById("geomtype").style.visibility = "hidden";
	sl = 2;
// LOAD STATISTICAL DATA
    var params2 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params2 += 'typeName=synthesis:g01_sl2_oeh&';
        params2 += 'propertyName=buildingid,floor,datum,l_hour,occupation,exploitation&';
        params2 += 'cql_filter=datum\=\''+selectedDate+'\'';

    var validJson2;
    var chartData2 = GetFeatureWFS(url, params2, function(validJson2) {           //edditen 1-6-2016
        buildingData = validJson2;
    });

    // REQUEST FLOOR GEOMETRY
    var params4 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params4 += 'typeName=synthesis:g01_sl2geom&';
        params4 += 'propertyName=buildingid,floorname,floorname_db,height,minHeight,geom&';
        params2 += 'cql_filter=datum\=\''+selectedDate+'\'';
    setTimeout(function(){

    var validJson4;
    var osm_buildings_Delft = GetFeatureWFS(url, params4, function(validJson4) {
                    buildings_json = validJson4;
                    for (var key in buildings_json.features){
                            colorvalue = '#999999'
                            for (var index in buildingData.features){

                                if (buildings_json.features[key].properties['buildingid'] == buildingData.features[index].properties['buildingid'] //'building_no
                                    && buildingData.features[index].properties['l_hour'] == '11:00:00Z' && buildings_json.features[key].properties['floorname_db'] == buildingData.features[index].properties['floor']){
                                    colorvalue = coloring(buildingData.features[index].properties['exploitation'],buildingcolors);
                                }
                                else {
                                }
            					buildings_json.features[key].properties.roofColor = colorvalue;
            					buildings_json.features[key].properties.color = colorvalue;
                            }
                        }

                    myData = osmb.addGeoJSON(validJson4);
    });
    },2000)
}



// voorbeeld Marianne
// function getChartData(optionnumber){
	// if (optionnumber == 1){
		// var params = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
			// params += 'typeName=synthesis:g01_test_rob&';
			// params += 'propertyName=buildingid,buildingname,occupancy&';

	// // LOAD DATA
	// var validJson2;
	// var chartData1 = GetFeatureWFS( url, params, function(validJson2) {
		// buildingData = validJson2;
        // osmb.addGeoJSON(validJson2);
        // console.log('inner loop')
	// });
	// console.log('outerloop');
	// return 5;
// }}

/*
var url = 'http://localhost:8080/geoserver/synthesis/ows?';
//var url = 'http://www.gdmc.nl:8088/geoserver/geoweb/ows?';

// These are the basic parameters for a WFS request (let op: epsg is 4326 voor Leaflet WFS):
//var params = 'service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
var params = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';

// + Specify the WFS feature type that you request from the WFS service
// In this case the CBS buurten (=neighbourhoods) 2014:
//params += 'typeName=geoweb:pand_2d&';
params += 'typeName=synthesis:g01_buildingsgeom&';
//params += 'typeName=synthesis:g01_buildingsgeom&';


//params += 'propertyName=geovlak_4326,height&' ;
params += 'propertyName=geom_28992,buildingid,height&' ;

//synthesis:g01_buildingsgeom&maxFeatures=50
// If problems with loading time: limit amount of features (for debug)
//params += 'maxFeatures=400&';
//params += 'count=4000&';

//params += 'cql_filter=postcode4_max \= \'2628\'';
//params += 'cql_filter=bouwjaar \< 1600';
*/



