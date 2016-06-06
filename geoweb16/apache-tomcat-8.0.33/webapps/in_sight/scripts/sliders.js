// Spatial level slider
var slider1Value;

// Timeslider
var slider2Value;
// variable for changing time in WFS request (different format)
var timeRequest; 

var sl;

// SLIDER 1: SPATIAL LEVEL /////////////////////////////////////////////////////////////////////////////////////////////
var slider1ctx = document.getElementById('slider1');
noUiSlider.create(slider1ctx, {
	start: [1],
	step: 1,
	connect: 'lower',
	range:{
		'min' : [1],
		'max' : [3]
	}	
	});

function setMap(level){
	if (level == 1.00){
	    sl = 0;
		sl0(timeRequest);
		document.getElementsByClassName("geomtype")[0].style.visibility = "hidden";
	}
	if (level == 2.00){
	    sl = 1;
		sl1(timeRequest);
		setData1([]);
		document.getElementsByClassName("geomtype")[0].style.visibility = "visible";
	}
	if (level == 3.00){
		document.getElementsByClassName("geomtype")[0].style.visibility = "hidden";
	    sl = 2;
		sl2(timeRequest);
		
	}
}
	
slider1.noUiSlider.on('update', function( values, handle ) {
	//console.log("Selected SL: " + values[handle]);
	slider1Value = values[handle];
	setMap(slider1Value);	
});

// SLIDER 2: TIME SLIDER ///////////////////////////////////////////////////////////////////////////////////////////////
var slider2ctx = document.getElementById('slider2');
var slider2Value;
var newtime;

noUiSlider.create(slider2ctx, {
	start: [12],
	step: 1,
	format: wNumb({
		decimals: 0,
		}),
	tooltips: true,	
	range:{
		'min' : [00],
		'max' : [23]
	},
	pips: {
		mode: 'count',
		values: 5,
		density: 24,
		stepped:true
	}
	//cssPrefix: 'noUi-', // defaults to 'noUi-',
	//cssClasses: {noUi-extended}
	});

	
slider2.noUiSlider.on('update', function(values, handle){
    slider2Value = values[handle]-1;
    console.log(slider2Value);
    //setMap(slider2Value);
    //console.log("Selected time: " + slider2Value);
    if (slider2Value < 10.00){
        timeRequest = '0' + slider2Value + ':00:00Z';
    }
    else{
        timeRequest = slider2Value + ':00:00Z';
    }
    //console.log(timeRequest);
    if (sl == 0){
        sl0(timeRequest);
    }
    else if (sl == 1){
        sl1(timeRequest);
    }



    /*
    // recolor geometry
    for (var key in buildings_json.features){
        for (var index in campusData.features){
           if (campusData.features[index].properties['l_hour'] == timeRequest){
                colorvalue = coloring((campusData.features[index].properties['exploitation']),buildingcolors);
            }
        }
    buildings_json.features[key].properties.color = colorvalue;
    buildings_json.features[key].properties.roofColor = colorvalue;
    }
    myData  = osmb.addGeoJSON(validJson1);
    console.log(done);
    */
});




