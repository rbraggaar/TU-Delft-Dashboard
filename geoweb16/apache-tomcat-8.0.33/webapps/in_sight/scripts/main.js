// VALUE FOR THE DATE CQL FILTER
var selectedDate = '2016-04-01';

// CHECK IF JAVA IS ENABLED (NEEDED FOR CORRECT WORKING OF THE DASHBOARD)
// if (navigator.javaEnabled() == true){
	// var jmsg = "&#10004;";
// }
// else{
	// var jmsg = "&#10005;";
// }	
//document.getElementById("javaEnabled").innerHTML = "Java installed: " + jmsg;


// STORE USER INFO IN COOKIES (SAVE SETTINGS FOR RE-USE) ///////////////////////////////////////////////////////////////
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        document.getElementById("user").innerHTML = "Welcome, " + user;
    } else {
       user = prompt("Welcome to the in_sight online dashboard. Please take a moment to set-up the dashboard. \n Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}

// DATE SELECTOR ///////////////////////////////////////////////////////////////////////////////////////////////////////
var picker = new Pikaday({ 
	field: document.getElementById('datepicker'),
    onSelect: function() {
		console.log("Selected date: " + this.getMoment().format('Y-MM-DD'));
		},
	onClose: function() {
		selectedDate = this.getMoment().format('Y-MM-DD');
		//console.log(selectedDate);
			if (sl == 0){
        	    sl0();
        	}
        	else if (sl == 1){
        	    sl1();
        	}
        	else if (sl == 2){
        	    sl2();
        	}
		},
	defaultDate: new Date(2016, 03, 01),
	setDefaultDate: true,
	minDate: new Date(2016, 03, 01),
	maxDate: new Date(2016, 03, 30)
 });

// TOGGLE STATISTICS ///////////////////////////////////////////////////////////////////////////////////////////////////
function toggleStats(){
	var div = document.getElementById('stats');
    if (div.style.visibility !== 'visible') {
        div.style.visibility = 'visible';
    }
    else {
        div.style.visibility = 'hidden';
    }
}

// CREATE MAP OBJECT ///////////////////////////////////////////////////////////////////////////////////////////////////
var map = new GLMap('map', {
    position: { latitude:52.000807, longitude:4.373309 },
    zoom: 16,
	bounds: {
		left: 4.3549,
		top: 52.0099,
		right: 4.3985,
		bottom: 51.9939
	},
    minZoom: 12,
    maxZoom: 20,
    tilt: 35,
    state: false // stores map position/rotation in url
});

/*
// CREATE OBJECT FOR OSM BUILDINGS
var osmb = new OSMBuildings({
    baseURL: './OSMBuildings',
    minZoom: 15,
    maxZoom: 22,
    effects: ['shadows'],
}).addTo(map);


osmb.addMapTiles(
    'https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png',
    //'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    {}
);
*/

function clearr(){
    osmb={};
	osmb = new OSMBuildings({
        baseURL: './OSMBuildings',
        minZoom: 15,
        maxZoom: 22,
        effects: ['shadows'],
    }).addTo(map);


    osmb.addMapTiles(
        //'https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png',
        'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    {}
    );

};

//ADD ORIGINAL OSMB BUILDINGS
//osmb.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');

// EVENT HANDLERS ////////////////////////////////////////////////////////////////////////////////////////////////////

map.on('pointermove', function(e) {
    var id = osmb.getTarget(e.x, e.y, function(id) {
        if (id) {
            document.body.style.cursor = 'help';  
        } 
        else {
            document.body.style.cursor = 'default';
            }
    });
});

map.on('pointerdown', function(e) {
    var id = osmb.getTarget(e.x, e.y, function(id) {
        var selectlist = [];
        if (id) {
			var selectedId = buildings_json.features.find(function(item) {return item.id === id;});
			setTimeout(function(){
			    var buildingId = selectedId.properties['buildingid'];
                //var buildingdata1 = buildingData.features.find( function (item) { return item.properties.buildingid === buildingId ; });
			    setData1(buildingData, buildingId);
			},1000)

// POPUP
//            var map = new mapboxgl.Map({
//                container: 'map',
//                style: 'mapbox://styles/mapbox/streets-v8',
//                center: [-96, 37.8],
//                zoom: 3
//            });
//
//
//			var infoBox = new mapboxgl.Popup({closeOnClick: false})
//                console.log("HHELLLEEEUUUUU")
//                .setLngLat([e.x, e.y])
//                .setHTML('<h1>Hello World!</h1>')
//                .addTo(map);



// highlighting
//            console.log(buildings_json.features[0])
//            for (var key in buildings_json.features){
//                //console.log(buildings_json[key])
//                if (buildings_json.features[key].properties['buildingid'] == buildingId) {
//					selectlist.push(buildings_json.features[key].id)
//                }
//                //console.log('this is the key'+ buildings_json[key])
//            }
//            for (var item in selectlist){
//                buildings_json.features[item].geometry.color = '#f08000';
//                console.log(buildings_json.features[item]);
//				console.log(selectlist[item])
//                console.log(item)
//				osmb.highlight(selectlist[item], '#f08000')
//            };
//            console.log('selectlist'+ selectlist)
//
//            var selectlist = buildings_json

            osmb.highlight(id, '#f08000');
			// get id (according to TU Delft) of selected building

			// LOAD DATA TO CHART
            //setTimeout(function(){setData1(buildingData)}, 3000);
            //setTimeout(function(){setData2(buildingData)}, 3000);

            //console.log(features[0].properties[buildingid])
            //console.log(id.properties.buildingid)
            //divPopUp(id, e)
            //console.log(validJson.features[0].id)
			
			//FILL CHARTS WITH DATA
            //setData1(occupancy1);

          } 
        else {
            document.body.style.cursor = 'default';
            osmb.highlight(null);
            }
    });
});

// MAP CONTROL BUTTONS (DISABLED) //////////////////////////////////////////////////////////////////////////////////////

var controlButtons = document.querySelectorAll('.control button');

for (var i = 0, il = controlButtons.length; i < il; i++) {
    controlButtons[i].addEventListener('click', function(e) {
        var button = this;
        var parentClassList = button.parentNode.classList;
        var direction = button.classList.contains('inc') ? 1 : -1;
        var increment;
        var property;

        if (parentClassList.contains('tilt')) {
            property = 'Tilt';
            increment = direction*10;
        }
        if (parentClassList.contains('rotation')) {
            property = 'Rotation';
            increment = direction*10;
        }
        if (parentClassList.contains('zoom')) {
            property = 'Zoom';
            increment = direction*1;
        }
        if (property) {
            map['set'+ property](map['get'+ property]()+increment);
        }
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
var wallColor, roofColor, shadows = true;

var setColor = function(e){
    //wallColor = e.style.backgroundColor;
    //roofColor = e.style.backgroundColor;
    osmb.style({ wallColor:"blue", roofColor:roofColor, shadows:shadows });
}
*/
/*
  function divPopUp(id, e){

        var params = 'featureid='+id ;

        GetFeatureWFS( url, params, function(validJson ) {
                console.log(validJson);

                if (validJson){

                    var content = '<b>'+ validJson.features[0].id +'</b>' ;
                    content += '<table>' ;
                    content += '<tr>' ;
                    //$.each(feature.properties, function(key, value) {
                    for(key in validJson.features[0].properties){
                        //content += '<tr><td>'+ key +'</td><td>'+  validJson.features[0].properties[key] +'</td></tr>' ;
                        content += '<td>'+ key +'</td>' ;

                    //});
                    }
                    content += '</tr>' ;
                    content += '<tr>' ;
                    for(key in validJson.features[0].properties){
                        //content += '<tr><td>'+ key +'</td><td>'+  validJson.features[0].properties[key] +'</td></tr>' ;

                        content += '<td>'+ validJson.features[0].properties[key] +'</td>' ;
                    //});
                    }
                    content += '</tr>' ;
                    content += '</table>' ;

                    infoDiv.innerHTML=content ;
                    infoDiv.style.display = "block" ;
                    //infoDiv.style.left =  eval(e.x)+"px" ;
                    //infoDiv.style.top = eval(e.y)+"px" ;

                }

        });

  }
  */