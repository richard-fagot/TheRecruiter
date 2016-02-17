var authenticationSuccess = function() { 
	
};

var authenticationFailure = function() { 
	console.log("Failed authentication"); 
};

Trello.authorize({
  type: "popup",
  name: "Getting Started Application",
  scope: {
    read: true,
    write: true },
  expiration: "never",
  success: authenticationSuccess,
  error: authenticationFailure
});

var recruiterBoard = "56b8a4206acb32500891b5b9";

var stats = {
	contacted: 0,
	called: 0,
	interviewed: 0,
	hired: 0,
	rejected: 0,
	notinterested: 0
};

var lists = {
	contacted: "56b8a42ef8cfe670ff049d9b",
	called: "56c1d6c9b9e0feabd0d22fcb",
	interviewed: "56b8a4f7bd73d563ef52a309",
	hired: "56b8a4adc74b5f465aad5602",
	rejected: "56bb38e2c575ea2f58e23024",
	notinterested: "56bb39b91d56ccd8a899a2e0"
};

var dataTable = [];


var fail = function() {console.log("fail");}
var displayContacted = function(data) {
	$("#contacted").text( data.length);
	stats.contacted = data.length;
	dataTable.push(['contacted', data.length]);
}

var displayCalled = function(data) {
	$("#called").text( data.length);
	stats.called = data.length;
	dataTable.push(['called', data.length]);
}

var displayInterviewed = function(data) {
	$("#interviewed").text( data.length);
	stats.interviewed = data.length;
	dataTable.push(['interviewed', data.length]);
}

var displayHired = function(data) {
	$("#hired").text( data.length);
	stats.hired = data.length;
	dataTable.push(['hired', data.length]);
}


var displayRejected = function(data) {
	$("#rejected").text( data.length);
	stats.rejected = data.length;
	dataTable.push(['rejected', data.length]);
}

var displayNotInterested = function(data) {
	$("#notinterested").text( data.length);
	stats.notinterested = data.length;
	dataTable.push(['not interrested', data.length]);
}

var getStats = function () {
	// Trello.get('/lists/'+lists.contacted+'/cards', displayContacted, fail);
	// Trello.get('/lists/'+lists.called+'/cards', displayCalled, fail);
	// Trello.get('/lists/'+lists.interviewed+'/cards', displayInterviewed, fail);
	// Trello.get('/lists/'+lists.hired+'/cards', displayHired, fail);
	// Trello.get('/lists/'+lists.rejected+'/cards', displayRejected, fail);
	Trello.get('/lists/'+lists.notinterested+'/cards', displayNotInterested, fail);
}

var getContacted = function(cardID) {

	var deferred = $.ajax({
		url: "https://api.trello.com/1/lists/"+cardID+"/cards?key=b1f2a0219e4c69b472b5721208b95535&token=4c0ab28b6f92a1f13abf9fc1e1ac3932345135a62ea248897e6f33c7c2a472c1",
       
    }).then(function(response){ 
       displayContacted(response);
    });
    return deferred;
}

var getCalled = function(cardID) {

	var deferred = $.ajax({
		url: "https://api.trello.com/1/lists/"+cardID+"/cards?key=b1f2a0219e4c69b472b5721208b95535&token=4c0ab28b6f92a1f13abf9fc1e1ac3932345135a62ea248897e6f33c7c2a472c1",
       
    }).then(function(response){ 
       displayCalled(response);
    });
    return deferred;
}

var getInterviewed = function(cardID) {

	var deferred = $.ajax({
		url: "https://api.trello.com/1/lists/"+cardID+"/cards?key=b1f2a0219e4c69b472b5721208b95535&token=4c0ab28b6f92a1f13abf9fc1e1ac3932345135a62ea248897e6f33c7c2a472c1",
       
    }).then(function(response){ 
       displayInterviewed(response);
    });
    return deferred;
}

var getHired = function(cardID) {

	var deferred = $.ajax({
		url: "https://api.trello.com/1/lists/"+cardID+"/cards?key=b1f2a0219e4c69b472b5721208b95535&token=4c0ab28b6f92a1f13abf9fc1e1ac3932345135a62ea248897e6f33c7c2a472c1",
       
    }).then(function(response){ 
       displayHired(response);
    });
    return deferred;
}

var getRejected = function(cardID) {

	var deferred = $.ajax({
		url: "https://api.trello.com/1/lists/"+cardID+"/cards?key=b1f2a0219e4c69b472b5721208b95535&token=4c0ab28b6f92a1f13abf9fc1e1ac3932345135a62ea248897e6f33c7c2a472c1",
       
    }).then(function(response){ 
       displayRejected(response);
    });
    return deferred;
}

var getNotInterested = function(cardID) {

	var deferred = $.ajax({
		url: "https://api.trello.com/1/lists/"+cardID+"/cards?key=b1f2a0219e4c69b472b5721208b95535&token=4c0ab28b6f92a1f13abf9fc1e1ac3932345135a62ea248897e6f33c7c2a472c1",
       
    }).then(function(response){ 
       displayNotInterested(response);
    });
    return deferred;
}

var displayChart = function() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Type');
	data.addColumn('number', 'Quantité');
	data.addRows(dataTable);
	var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, null);
}

var drawChart = function() {
	// getStats();
	// window.setTimeout(displayChart, 2000);

	var d1 = getContacted(lists.contacted);
	var d2 = getCalled(lists.called);
	var d3 = getRejected(lists.rejected);
	var d4 = getNotInterested(lists.notinterested);
	var d5 = getInterviewed(lists.interviewed);
	var d6 = getHired(lists.hired);

	$.when(d1, d2, d3, d4, d5, d6).then(displayChart);
}

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

// for(int i = 0 ; i < Object.keys(lists).length ; i++) {
// 	var name = Object.keys(lists)[i];
// 	var id = lists[i];
// 	Trello.get('/lists/'+id+'/cards', success, fail);
	
// }
