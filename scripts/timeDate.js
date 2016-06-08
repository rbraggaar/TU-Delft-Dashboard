function startTime() {
	// create new date object
    var today = new Date();
	// create timedate string
	var y = today.getFullYear();
	var mo = today.getMonth() + 1;
	// day of the week
	var d = today.getDay();
	// day of the month
	var day = today.getDate();
	// time
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	
	mo = checkTime(mo);
	day = checkTime(day);
    m = checkTime(m);
    s = checkTime(s);
	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
	var timeDate = days[d - 1] + ", " + day.toString() + " / " + mo.toString() + " / " + y.toString();
	//console.log(timeDate);
   // document.getElementById("timeDate").innerHTML = timeDate;
    var t = setTimeout(startTime, 1000); //repeat every 1 sec
}

function checkTime(i) {
    if (i < 10) 
    {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}