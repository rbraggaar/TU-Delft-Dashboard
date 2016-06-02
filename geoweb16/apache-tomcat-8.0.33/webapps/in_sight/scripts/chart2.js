var ctx2 = document.getElementById("chart2").getContext("2d");
var highest2 = [0];

function setData2(d){
    //console.log("DATA" + JSON.stringify(d))
    var data = [];
    for (var key in d.features){
        var exp = d.features[key].properties['occupation']
        data.push(exp)
        if (exp > highest2[0] && d.features[key].properties['l_hour'] > '09:00:00Z' && '21:00:00Z' >  d.features[key].properties['l_hour'] ){
            highest2[0] = exp;
        }
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var barChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
                "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
            datasets: [{
                label: 'number of people',
                data: data
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        max: highest2[0] + 200
                    }
                }]
            }
        }
    });
}
