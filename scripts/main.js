// VALUE FOR THE DATE CQL FILTER
var selectedDate = '2016-04-01';
var buildingDataSL0;

var myData = 0;
// CHECK IF JAVA IS ENABLED (NEEDED FOR CORRECT WORKING OF THE DASHBOARD)
// if (navigator.javaEnabled() == true){
	// var jmsg = "&#10004;";
// }
// else{
	// var jmsg = "&#10005;";
// }	
//document.getElementById("javaEnabled").innerHTML = "Java installed: " + jmsg;

// default selected button is realistic geometry
document.getElementsByClassName("gt")[0].style.border = "4px solid #FF6133";

// STORE USER INFO IN COOKIES (SAVE SETTINGS FOR RE-USE)
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

// DATE SELECTOR 
var picker = new Pikaday({ 
	field: document.getElementById('datepicker'),
    onSelect: function() {
		console.log("Selected date: " + this.getMoment().format('Y-MM-DD'));
		},
	onClose: function() {
		selectedDate = this.getMoment().format('Y-MM-DD');
			if (sl == 0){
        	    loadData(selectedDate);
        	    sl0(timeRequest);
        	}
        	else if (sl == 1){
        	    sl1(timeRequest);
				setData1([]);
				osmb.highlight(null);
        	}
        	else if (sl == 2){
        	    sl2(timeRequest);
        	    setData1([]);
        	}
			//clearr();
		},
	defaultDate: new Date(2016, 03, 01),
	setDefaultDate: true,
	minDate: new Date(2016, 03, 01),
	maxDate: new Date(2016, 04, 31)
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
    tilt: 35,
    state: false // stores map position/rotation in url
});

// CREATE OBJECT FOR OSM BUILDINGS
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

//osmb.date(new Date(2015,15,1,10,30));

function clearr(){
    myData.destroy();
};

//ADD ORIGINAL OSMB BUILDINGS
//osmb.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');


// EVENT HANDLERS
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
			osmb.highlight(id, '#f08000');
			// get id (according to TU Delft) of selected building
			var selectedId = buildings_json.features.find(function(item) {return item.id === id;});
			setTimeout(function(){
			    var buildingId = selectedId.properties['buildingid'];
                // build loop
                var buildingdata1 = buildingData.features.find(function(item){ 
				return item.properties.buildingid === buildingId;});
                // build in loop to append all data
//				console.log('buildingdata1: ');
//				console.log(buildingdata1);
//				console.log(buildingData);
			    setData1(buildingData, buildingId);
				},1000);

			// POPUP
   
          }
        else {
            document.body.style.cursor = 'default';
            osmb.highlight(null);
        }
    });
});


//buildingDataSL0 = buildings_json.features.properties;
//console.log(buildingDataSL0);

// MAP CONTROL BUTTONS
var controlButtons = document.querySelectorAll('.control button');

for (var i = 0, il = controlButtons.length; i < il; i++) {
    controlButtons[i].addEventListener('click', function(e) {
        var button = this;
        var parentClassList = button.parentNode.classList;
        var direction = button.classList.contains('inc') ? 1 : -1;
        var increment;
        var property;
		var zoomlevels = [10,20];
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
			//if (property < zoomlevels[1] && property > zoomlevels [0])
            increment = direction*1;
        }
        if (property) {
            map['set'+ property](map['get'+ property]()+increment);
        }
    });
}

// Export charts function
function exportImage(id, fileName){
	fileName += " (" + selectedDate + ")";
	var canvasElement = document.getElementById(id);
	var MIME_TYPE = "image/png";
	var imgURL = canvasElement.toDataURL(MIME_TYPE);
	var dlLink = document.createElement('a');
	dlLink.download = fileName;
	dlLink.href = imgURL;
	dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
	document.body.appendChild(dlLink);
	dlLink.click();
	document.body.removeChild(dlLink);
}

function progr(){
	document.getElementById("prog").style.visibility = "visible";
	document.getElementById("prog").style.visibility = "hidden";
}
// for (var i = 0; i <= 100; i++){
	// setTimeout(function(),500){
	// document.getElementById("progress").value = String(i);
	// })
// }

	