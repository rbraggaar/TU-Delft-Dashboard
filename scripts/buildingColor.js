buildingcolors = ["#ffffcc",    // grijs
                    "#002066",  // dblauw
                    "#0038b2",  // mblauw
                    "#6696ff",  // blauw
                    "#b2caff",  // lblauw
                    "#caffb2",  // groen
                    "#ffb2ca",  // lrood
                    "#fb3a75"]; // drood

var steplist = ["0% - 20%", "20% - 40%", "40% - 60%", "60% - 80%", "80% - 100%", "100% - 120%", "120% +"];

//console.log(buildingcolors.length)

// occupation: persons per hour     not coloring
// exploitation nuttig vloer opp/aantal mensen per uur
// 0% heel veel m2 onderbezetting blauw;    100% 1.8 m2 groen         >1.8 rood
// grmmideld gebouw 30000

var countsteps = 20
var counternew = 0
var lowestvalue = 14.4
var highestvalue = 100
var startuplowest = 0;
var startuphighest= 0;



/*
function startup(countsteps,counternew,lowestvalue,highestvalue,steplist,startuplowest,startuphighest){
    while (((buildingcolors.length)-1) > counternew){
        if (counternew == 0){
            startuplowest = 0;
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
*/

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

function coloring(exploitation,buildingcolors) {
    var coloring2;
    if (exploitation < 12.08){
        coloring2 = buildingcolors[7];
//        console.log("exploitation " + exploitation)
//        console.log('light green')
    }
    else if (12.08 <= exploitation &&  exploitation <14.5){                                      //(exploitation < 31){
        coloring2 = buildingcolors[6];
        //console.log('in the right function')
//      console.log("exploitation " + exploitation)
//      console.log("dark blue")
    }
    else if (14.5 <= exploitation && exploitation < 18.125){
        coloring2 = buildingcolors[5];
//        console.log("exploitation " + exploitation)
//        console.log('light blue')
    }
    else if (18.125 <= exploitation && exploitation < 24.16666){
        coloring2 = buildingcolors[4];
//        console.log("exploitation " + exploitation)
//        console.log('light green')
    }
    else if (24.16666 <= exploitation && exploitation < 36.25){
        coloring2 = buildingcolors[3];
//        console.log("exploitation " + exploitation)
//        console.log('dark green')
    }
    else if (36.25 <= exploitation && exploitation < 72.5){
        coloring2 = buildingcolors[2];
//        console.log("exploitation " + exploitation)
//        console.log('yellow')
    }
    else if (72.5 <= exploitation){
        coloring2 = buildingcolors[1];
    }
    else {
        coloring2 = buildingcolors[0];
    }
//    console.log(coloring2)
//    console.log(exploitation)
    return coloring2
}