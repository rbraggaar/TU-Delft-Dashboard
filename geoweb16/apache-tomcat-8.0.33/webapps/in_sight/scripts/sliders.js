
// Spatial level slider
var slider1Value;

// Timeslider
var slider2Value;
// variable for changing time in WFS request (different format)
var timeRequest; 

var sl;

// SLIDER 1: SPATIAL LEVEL
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
		sl0();
	}
	if (level == 2.00){
	    sl = 1;
		sl1();
	}
	if (level == 3.00){
	    sl = 2;
		sl2();
	}
}
	
slider1.noUiSlider.on('update', function( values, handle ) {
	console.log("Selected SL: " + values[handle]);
	slider1Value = values[handle];
	setMap(slider1Value);
});

// SLIDER 2: TIME SLIDER
var slider2ctx = document.getElementById('slider2');
var slider2Value;

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
	//cssPrefix: 'noUi-', // defaults to 'noUi-',
	//cssClasses: {noUi-extended}
	});

	
slider2.noUiSlider.on('update', function( values, handle ) {
	slider2Value = values[handle];
	setMap(slider2Value);
	console.log("Selected time: " + slider2Value);
	if (slider2Value < 10.00){
		timeRequest = '0' + slider2Value + ':00:00Z';
		//console.log(timeRequest);
	}
	else{
		timeRequest = slider2Value + ':00:00Z';
		//console.log(timeRequest);
	}
});



