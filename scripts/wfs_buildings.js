// WFS SOURCE
var url = 'http://localhost:8080/geoserver/synthesis/ows?';


 // LINK GEOMTYPE BUTTONS
var geomType = 'g01_newcampusgeom';
function editGeomType(type){
    geomType = type;
	if (geomType == 'g01_newcampusgeom'){
	    	document.getElementsByClassName("gt")[0].style.border = "4px solid #ff6133";
	    	document.getElementsByClassName("gt")[1].style.border = "1px solid grey";
	}
	else {
	    document.getElementsByClassName("gt")[1].style.border = "4px solid #ff6133";
	    document.getElementsByClassName("gt")[0].style.border = "1px solid grey";
	}
	sl1(timeRequest);
}

// LOAD MAP LAYER
var mapLayers;
var counter = 0;

// ATTRIBUTES
var selectedDate = '2016-04-01';
var campusData;
var buildingData;
var floorData;

// GEOMETRY
var buildings_json;
var bars_json;
var colorvalue;

// LOAD GEOMETRY ////////////////////////////////////////////////////////////////////////////////////////////////////////
var buildings_json = function (){
    // REQUEST REALISTIC GEOMETRY
    var params0 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params0 += 'typeName=synthesis:g01_newcampusgeom&';
        params0 += 'propertyName=geom,buildingid,height&';

	// LOAD DATA
        var validJson0;
        var chartData0 = GetFeatureWFS(url, params0, function(validJson0) {
					buildings_json = validJson0;
					});
	console.log("buildings_json")
}

var bars_json = function (){
    // REQUEST BAR GEOMETRY
    var params1 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params1 += 'typeName=synthesis:g01_centerpointbuffers&';
        params1 += 'propertyName=geom,buildingid,height,part&';

	// LOAD DATA
	var validJson1;
	var chartData1 = GetFeatureWFS( url, params1, function(validJson1) {
        bars_json = validJson1;
	});
	console.log("bars_json");
}

buildings_json();
bars_json();

var loadData = function(selectedDate){

    //document.getElementById("geomtype").style.visibility = "hidden";
    // REQUEST SL0 DATA
    var params2 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params2 += 'typeName=synthesis:g01_sl0_oeh&';
        params2 += 'propertyName=datum,l_hour,occupation,exploitation&';
        //params2 += 'cql_filter=datum\=\'2016-04-01\'';
        params2 += 'cql_filter=datum\=\''+selectedDate+'\'';

	// LOAD DATA
	var validJson2;
	var chartData2 = GetFeatureWFS( url, params2, function(validJson2) {
        campusData = validJson2;
	});

    // LOAD STATISTICAL DATA
    var params3 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params3 += 'typeName=synthesis:g01_sl1_oeh&';
        params3 += 'propertyName=buildingid,datum,l_hour,occupation,exploitation&';
        params3 += 'cql_filter=datum\=\''+selectedDate+'\'';

	// LOAD DATA
	var validJson3;
	var chartData3 = GetFeatureWFS( url, params3, function(validJson3) {
        buildingData = validJson3;
	});
	console.log("load data")
}

loadData(selectedDate);

// LOAD GEOM AND DATA ONTO MAP /////////////////////////////////////////////////////////////////////////////////////////
var sl0 = function (timeRequest){
   	if (counter >= 1){
   		clearr();
   	}
   	else {
   		counter += 1;
   		var timeRequest = '12:00:00Z';
   	}

    // LOAD DATA TO CHART
    setTimeout(function(){setData1(campusData);console.log(campusData);}, 1000);

    setTimeout(function(){
        // COLOR GEOMETRY
        for (var key in buildings_json.features){
            for (var index in campusData.features){
               if (campusData.features[index].properties['l_hour'] == timeRequest){
                    //console.log(campusData.features[index].properties['l_hour'],timeRequest);
                    colorvalue = coloring((campusData.features[index].properties['exploitation']),buildingcolors);
                }
            }
        buildings_json.features[key].properties.color = colorvalue;
        buildings_json.features[key].properties.roofColor = colorvalue;
        }
    myData  = osmb.addGeoJSON(buildings_json);

    }, 1000);
    console.log("reload sl0");
}

var sl1 = function (timeRequest){
    clearr();

    setTimeout(function(){
        if (geomType == 'g01_newcampusgeom'){
            for (var key in buildings_json.features){
                for (var index in buildingData.features){
                    if (buildings_json.features[key].properties['buildingid'] == buildingData.features[index].properties['buildingid']
                        && buildingData.features[index].properties['l_hour'] == timeRequest){
                        colorvalue = coloring(buildingData.features[index].properties['exploitation'],buildingcolors);
                    }
                    buildings_json.features[key].properties.roofColor = colorvalue;
                    buildings_json.features[key].properties.color = colorvalue;
                }
            }
        myData = osmb.addGeoJSON(buildings_json);
        }

        else {
            for (var key in bars_json.features){
                for (var index in buildingData.features){
                    if (bars_json.features[key].properties['buildingid'] == buildingData.features[index].properties['buildingid']
                        && buildingData.features[index].properties['l_hour'] == timeRequest){
                        colorvalue = coloring(buildingData.features[index].properties['exploitation'],buildingcolors);
                        if (geomType == 'g01_centerpointbuffers' && bars_json.features[key].properties['part']==2){
                            bars_json.features[key].properties['height'] = (14.4/(parseInt(buildingData.features[index].properties['exploitation'])))*100;
                        }
                        else if (geomType == 'g01_centerpointbuffers' && bars_json.features[key].properties['part']==1){
                            bars_json.features[key].properties['height'] = 100;
                        };
                    }
                    else {
                    }
                    if (geomType == 'g01_centerpointbuffers' && bars_json.features[key].properties['part']==1){
                        bars_json.features[key].properties.roofColor = '#999999';
                        bars_json.features[key].properties.color = '#999999';
                    }
                    else {
                        bars_json.features[key].properties.roofColor = colorvalue;
                        bars_json.features[key].properties.color = colorvalue;
                    }
                }
            }
        myData = osmb.addGeoJSON(bars_json);
        }


    },1000);
    console.log("reload sl1");
}

var sl2 = function (timeRequest){
    clearr();
// LOAD STATISTICAL DATA
    var params4 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params4 += 'typeName=synthesis:g01_sl2_oeh&';
        params4 += 'propertyName=buildingid,floor,datum,l_hour,occupation,exploitation&';
        params4 += 'cql_filter=datum\=\''+selectedDate+'\'';

    var validJson4;
    var chartData4 = GetFeatureWFS(url, params4, function(validJson4) {
        floorData = validJson4;
    });

    // REQUEST FLOOR GEOMETRY
    var params5 = 'service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&';
        params5 += 'typeName=synthesis:g01_sl2geom&';
        params5 += 'propertyName=buildingid,floorname,floorname_db,height,minHeight,geom&';

    setTimeout(function(){
        var validJson5;
        var floors = GetFeatureWFS(url, params5, function(validJson5) {
            floors_json = validJson5;
            for (var key in floors_json.features){
                colorvalue = '#999999'
                for (var index in floorData.features){

                    if (floors_json.features[key].properties['buildingid'] == floorData.features[index].properties['buildingid']
                        && floorData.features[index].properties['l_hour'] == timeRequest && floors_json.features[key].properties['floorname_db'] == floorData.features[index].properties['floor']){
                        colorvalue = coloring(floorData.features[index].properties['exploitation'],buildingcolors);
                    }
                    else {
                    }
                    floors_json.features[key].properties.roofColor = colorvalue;
                    floors_json.features[key].properties.color = colorvalue;
                }
                }

            myData = osmb.addGeoJSON(validJson5);
        });
    },2000)
}