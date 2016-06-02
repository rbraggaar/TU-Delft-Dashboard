buildingcolors = ["#10ffffcc", "#d9f0a3", "#addd8e", "#78c679","#31a354", "#006837"];

//console.log(buildingcolors.length)

// occupation: persons per hour     not coloring
// exploitation nuttig vloer opp/aantal mensen per uur
// 0% heel veel m2 onderbezetting blauw;    100% 1.8 m2 groen         >1.8 rood
// grmmideld gebouw 30000

var countsteps = 20
var counternew = 0
var lowestvalue = 14.4
var highestvalue = 100
var steplist = []
var startuplowest = 0;
var startuphighest= 0;

function startup(countsteps,counternew,lowestvalue,highestvalue,steplist,startuplowest,startuphighest){
    while (((buildingcolors.length)-1) > counternew){
        if (counternew == 0){
            startuplowest = lowestvalue;
            startuphighest = startuplowest + countsteps;
            var addto = [startuplowest,startuphighest];
            //console.log('addto ' + addto);
            steplist.push(addto);
            counternew += 1;
        }
        else if (((buildingcolors.length)-2) == counternew){
            var addto = [startuphighest,highestvalue];
            //console.log('addto ' + addto);
            steplist.push(addto);
            counternew += 1;
            break
        }
        else {
            startuplowest = startuphighest;
            startuphighest = startuplowest + countsteps;
            var addto = [startuplowest,startuphighest];
            //console.log('addto ' + addto);
            steplist.push(addto);
            counternew += 1;
        }
    };
};

var x = startup(countsteps,counternew,lowestvalue,highestvalue,steplist,startuplowest,startuphighest);

function setLegend(){
	var cells = document.getElementById("legend").getElementsByTagName("td");
	var counter = 0;
	for (var i = 0; i < cells.length; i++) {
		if (i == 0){
			cells[i].innerHTML = 'No data';
		}
		else if (i == 1){
			cells[i].style.backgroundColor ='#999999'
		}
		else if (i % 2 == 0){
			cells[i].innerHTML = steplist[counter];
		}
		else{
			cells[i].style.backgroundColor = buildingcolors[counter+1];
			counter += 1;
		}
	}
}

function coloring(exploitation,steplist,buildingcolors,lowestvalue) {
    var coloring2;
    if (exploitation < lowestvalue){
        coloring2 = '#ff6666'
//        console.log("exploitation " + exploitation)
//        console.log('light green')
    }
    else if (steplist[0][0] <= exploitation &&  exploitation < steplist[0][1]){                                      //(exploitation < 31){
        coloring2 = buildingcolors[1]
        //console.log('in the right function')
//      console.log("exploitation " + exploitation)
//      console.log("dark blue")
    }
    else if (steplist[1][0] <= exploitation && exploitation < steplist[1][1]){
        coloring2 = buildingcolors[2]
//        console.log("exploitation " + exploitation)
//        console.log('light blue')
    }
    else if (steplist[2][0] <= exploitation && exploitation < steplist[2][1]){
        coloring2 = buildingcolors[3]
//        console.log("exploitation " + exploitation)
//        console.log('light green')
    }
    else if (steplist[3][0] <= exploitation && exploitation < steplist[3][1]){
        coloring2 = buildingcolors[4]
//        console.log("exploitation " + exploitation)
//        console.log('dark green')
    }
    else if (steplist[4][0] <= exploitation){
        coloring2 = buildingcolors[5]
//        console.log("exploitation " + exploitation)
//        console.log('yellow')
    }
    return coloring2
}