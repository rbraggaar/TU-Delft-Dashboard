var ctx1 = document.getElementById("chart1").getContext("2d");
var highest1 = [10];
// initial data values
var data = [0];

var barChart1 = new Chart(ctx1, {
	type: 'bar',
	data: {
		labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
			"12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
		datasets: [{
				label: 'exploitation rate in %',
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				data: data			
			}
		]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true,
					max: highest1[0]
				}
			}]
		}
	}
});

function setData1(d, buildingid){
	data = [];
	highest1[0] = 10;
	// SL 0
    if (sl == 0){
		// set data for chart 2
        setData2(d);
        for (var key in d.features){
            var exp = (14.5/(d.features[key].properties['exploitation']))*100;
            data.push(Math.round(exp));
            if (exp > highest1[0] && d.features[key].properties['l_hour'] > '07:00:00Z' && '19:00:00Z' >  d.features[key].properties['l_hour'] ){
                highest1[0] = exp;
            }
        } 
    }
    
	// SL 1
	else if (sl == 1){
        setData2(d, buildingid);



        for (var key in d.features){
            if (d.features[key].properties['buildingid'] == buildingid){
                var exp = (14.5/(d.features[key].properties['exploitation']))*100;
                data.push(Math.round(exp));
                console.log(d.features[key].properties['l_hour']);
                if (exp > highest1[0] && d.features[key].properties['l_hour'] > '07:00:00Z' && '19:00:00Z' >  d.features[key].properties['l_hour'] ){
                    highest1[0] = exp;
                }
            }
        }
    }
    
	// SL2
	else if (sl == 2){
        // setData2(..)
    }
	
    // if y-axis max below 100, make it 100 for nice %
	if (highest1[0] < 100){
        highest1[0] = 100;
    }
    else {
        highest1[0] = Math.round((highest1[0]+20) / 10) * 10;
    }
	// set the chart data to the modified data object:
	barChart1.data.datasets[0].data = data;
	// set the chart max y-value:
	barChart1.options.scales.yAxes[0].ticks.max = highest1[0];
	// re-render the chart with updated values:
	barChart1.update();
}

