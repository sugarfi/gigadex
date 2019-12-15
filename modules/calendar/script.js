var date = new Date();
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var today = date.getDate();
var number = getNumDays(date);
var chosen = 0;
var debug = false;
var count = 0;

document.getElementById("submitDes").onclick = submitDes;
document.getElementById("cancelDes").onclick = cancelDes;

if (debug == true){
	var events = {
		0: 'none'
	};
	window.localStorage.setItem('events', JSON.stringify(events));	
}
if (debug == false){
	var store = window.localStorage.getItem('events');
	var events = JSON.parse(store) || {};
}
function getNumDays(lmao){
    var d= new Date(lmao.getFullYear(), lmao.getMonth()+1, 0);
    return d.getDate();
}
function countEvents(){
	count = 0;
	for (k in events) {
		if (events.hasOwnProperty(k)) {
			count++
		}
	};
}

function init(){
	document.getElementById("month").innerHTML = months[date.getMonth()];
	for (let x = 1; x <= number; x++){
		if (x <= 7){
			addNumbers(x, 1);
		}
		else if(x > 7 && x <= 14){
			addNumbers(x, 2);
		}
		else if(x > 14 && x <= 21){
			addNumbers(x, 3);
		}
		else if(x > 21 && x <= 28){
			addNumbers(x, 4);
		}
		else if(x > 28 && x <= number){
			addNumbers(x, 5);
		}
	}
	document.getElementById(today).classList.add("active");
	addEvents();
}
init();
function addEvents(){
	countEvents();
	var e = Object.keys(events);
	for (let y = 1; y <= count+1; y++){
		if(events[e[y]] != undefined){
			document.getElementById(e[y]).innerHTML += '<p class="event">'+events[e[y]]+'</p>';
		}
	}
}
function addNumbers(x, row){
	document.getElementById("row" + row).innerHTML += '<td onclick="openEvent(this.id)" id="'+x+'">'+x+'</td>';
}
function openEvent(date){
	document.getElementById("des").value = '';
	document.getElementById("addEvents").style.display = "block";
	chosen = date;
}
function cancelDes(){
	document.getElementById("addEvents").style.display = "none";
}
function submitDes(){
	var toSave = document.getElementById("des").value;
	if(toSave == ''){
		alert("Not enough description for event.");
		return;
	}
	else{
		if (chosen === undefined){
			return;
		}
		events[chosen] = toSave;
	}
	window.localStorage.setItem('events', JSON.stringify(events));
	location = location;
	cancelDes();
}