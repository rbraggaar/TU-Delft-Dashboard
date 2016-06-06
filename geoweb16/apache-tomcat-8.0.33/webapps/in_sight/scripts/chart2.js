var ctx2 = document.getElementById("chart2").getContext("2d");
var highest2 = [10];
// initial data values
var data2 = [0];

var barChart2 = new Chart(ctx2, {
	type: 'bar',
	data: {
		labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
			"12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
		datasets: [{
			label: 'number of people',
			data: data2
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true,
					max: highest2[0]
				}
			}]
		}
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setData2(d, buildingid){
	data2 = [];
	highest2[0] = 10;
	// SL 0
    if (sl == 0){
        for (var key in d.features){
            var exp2 = d.features[key].properties['occupation'];
             data2.push(Math.round(exp2));
            if (exp2 > highest2[0] && d.features[key].properties['l_hour'] > '07:00:00Z' && '19:00:00Z' >  d.features[key].properties['l_hour'] ){
                highest2[0] = exp2;
            }
        }
    }

	// SL 1
	else if (sl == 1){
        for (var key in d.features){
            if (d.features[key].properties['buildingid'] == buildingid){
                var exp2 = d.features[key].properties['occupation'];
                data2.push(Math.round(exp2));
                if (exp2 > highest2[0] && d.features[key].properties['l_hour'] > '07:00:00Z' && '19:00:00Z' >  d.features[key].properties['l_hour'] ){
                    highest2[0] = exp2;
                    }
            }
        }
    }

    highest2[0] = Math.round((highest2[0]+200) / 10) * 10;
	// set the chart data to the modified data object:
	barChart2.data.datasets[0].data = data2;
	// set the chart max y-value:
	barChart2.options.scales.yAxes[0].ticks.max = highest2[0];
	// re-render the chart with updated values:
	barChart2.update(); 
}
