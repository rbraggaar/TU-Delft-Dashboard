// WFS SOURCE
var url = 'http://localhost:8080/geoserver/synthesis/ows?';

var geomType = 'g01_newcampusgeom';
function editGeomType(type){        //g01_newcampusgeom or g01_centerpointbuffers
    geomType=type;
    sl1();
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
    clearr();
	document.getElementById("geomtype").style.visibility = "hidden";

    // STATISTICAL DATA
    var params0 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params0 += 'typeName=synthesis:g01_sl0_oeh&';
        params0 += 'propertyName=datum,l_hour,occupation,exploitation&';
        //params0 += 'cql_filter=datum\=\'2016-04-01\'';
        params0 += 'cql_filter=datum\=\''+selectedDate+'\'';
        console.log(params0)

	// LOAD DATA
	var validJson0;
	var chartData0 = GetFeatureWFS( url, params0, function(validJson0) {
        campusData = validJson0;
	});

    // LOAD DATA TO CHART
    setTimeout(function(){setData1(campusData,0);console.log(campusData)}, 3000);

	// DELAY GEOMETRY LOAD
    setTimeout(function(){
        // REQUEST REALISTIC GEOMETRY
        var params1 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
            //params1 += 'typeName=synthesis:'+geomType+'&';
            params1 += 'typeName=synthesis:g01_newcampusgeom&';
            params1 += 'propertyName=geom,buildingid,height&';

        // LOAD GEOMETRY
        var validJson1;
        var osm_buildings_Delft = GetFeatureWFS(url, params1, function(validJson1) {
            buildings_json = validJson1;

            // Color Geometry
            for (var key in buildings_json.features){
                for (var index in campusData.features){
                   if (campusData.features[index].properties['l_hour'] == '09:00:00Z'){    
                 //if (campusData.features[index].properties['l_hour'] == '\'' + timeRequest + '\''){ 
                 //if (campusData.features[index].properties['l_hour'] == '09:00:00Z'){   
                 //if (campusData.features[index].properties['l_hour'] == timeRequest){
                        colorvalue = coloring((campusData.features[index].properties['exploitation']),steplist,buildingcolors,lowestvalue);
                    }
                }
            buildings_json.features[key].properties.color = colorvalue;
            buildings_json.features[key].properties.roofColor = colorvalue;
            }
        osmb.addGeoJSON(validJson1);
        }) ;
     }, 1000);
};

// FACULTY (SL1) ///////////////////////////////////////////////////////////////////////////////////////////////////////
var sl1 = function () {
    clearr();
	document.getElementById("geomtype").style.visibility = "visible";

// LOAD STATISTICAL DATA
    var params2 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params2 += 'typeName=synthesis:g01_sl1_oeh&';
        params2 += 'propertyName=buildingid,datum,l_hour,occupation,exploitation&';
        //params2 += 'cql_filter=datum\=\'2016-04-12\'';
        params2 += 'cql_filter=datum\=\''+selectedDate+'\'';
        console.log(params2)

    // LOAD DATA
    var validJson2;
    var chartData2 = GetFeatureWFS(url, params2, function(validJson2) {
        buildingData = validJson2;
    });

       // REQUEST GEOMETRY TYPE
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

    console.log(params3)
    // DELAY GEOMETRY LOAD
    setTimeout(function(){

    // LOAD GEOMETRY
        var validJson3;
        var osm_buildings_Delft = GetFeatureWFS(url, params3, function(validJson3) {
			buildings_json = validJson3;
		});

    // colour geometry
        for (var key in buildings_json.features){
            colorvalue = '#999999'
            if (geomType == 'g01_centerpointbuffers'){
                buildings_json.features[key].properties['height']= 1;
            }
            for (var index in buildingData.features){
                 if (buildings_json.features[key].properties['buildingid'] == buildingData.features[index].properties['buildingid']
                    //&& buildingData.features[index].properties['l_hour'] == '\'' + timeRequest + '\''){
                    && buildingData.features[index].properties['l_hour'] == '12:00:00Z'){
                    colorvalue = coloring((buildingData.features[index].properties['exploitation']),steplist,buildingcolors,lowestvalue);

                    if (geomType == 'g01_centerpointbuffers' && buildings_json.features[key].properties['part']==2){
                        buildings_json.features[key].properties['height'] = (14.4/(parseInt(buildingData.features[index].properties['exploitation'])))*100;
                    }
                    else if (geomType == 'g01_centerpointbuffers' && buildings_json.features[key].properties['part']==1){
                        buildings_json.features[key].properties['height'] = 144;
                    };
                }
                else {}
                if (geomType == 'g01_centerpointbuffers' && buildings_json.features[key].properties['part']==1){
                    buildings_json.features[key].properties.roofColor = '#999999';
                    buildings_json.features[key].properties.color = '#999999';
                }
                else{
                    buildings_json.features[key].properties.roofColor = colorvalue;
                    buildings_json.features[key].properties.color = colorvalue;
                }

            }

            osmb.addGeoJSON(buildings_json);
        };
    },3000);
}

// FLOOR (SL2) /////////////////////////////////////////////////////////////////////////////////////////////////////////
var sl2 = function () {
    clearr();
	document.getElementById("geomtype").style.visibility = "hidden";
	sl = 2;

    // REQUEST FLOOR GEOMETRY
    var params4 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params4 += 'typeName=synthesis:g01_sl2geom&';
        params4 += 'propertyName=buildingid,minHeight,height,geom&';

    // LOAD GEOMETRY
    var validJson4;
    var osm_buildings_Delft = GetFeatureWFS(url, params4, function(validJson4) {
                    buildings_json = validJson4;
                    osmb.addGeoJSON(validJson4);
    });
}

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