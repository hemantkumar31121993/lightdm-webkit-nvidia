function startTime() {
    var today=new Date();
	var options = { weekday : 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric', hour12:false};
    var str = today.toLocaleString('en-IN', options);
	document.getElementById('clock').innerHTML=str;

    t=setTimeout('startTime()', 500)
}
window.onload=startTime;
