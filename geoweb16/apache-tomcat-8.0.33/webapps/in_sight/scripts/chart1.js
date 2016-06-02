var ctx1 = document.getElementById("chart1").getContext("2d");
var highest1 = [0];

function setData1(d,click_id){
    //console.log("DATA" + JSON.stringify(d))
    var data = [];
    if (sl == 0){
        setData2(d);
        for (var key in d.features){
            var exp = d.features[key].properties['exploitation'];
            data.push(exp);
            if (exp > highest1[0] && d.features[key].properties['l_hour'] > '08:00:00Z' && '18:00:00Z' >  d.features[key].properties['l_hour'] ){
                highest1[0] = exp;
            }
        }
    }
    // remove if statement: now taken care of in sl1()
	else if (sl == 2){
        setData2(d);
        for (var key in d.features){
            var exp = d.features[key].properties['exploitation'];
            data.push(exp);
            if (exp > highest1[0] && d.features[key].properties['l_hour'] > '08:00:00Z' && '18:00:00Z' >  d.features[key].properties['l_hour'] ){
                highest1[0] = exp;
            }
        }
    }
    else if (sl == 2){
        // setData2(..)
    }

    if (highest1[0] < 100){
        highest1[0]=100;
    }
    else {
        highest1[0] = highest1[0]+10;
    }
    //console.log(highest1[0]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    var barChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
                "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
            datasets: [{
                label: 'exploitation rate in %',
                data: data
            }]
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
}




