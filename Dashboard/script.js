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
	notinterested: 0,
	hasResponse: 0
};

var lists = {
	contacted: "56b8a42ef8cfe670ff049d9b",
	called: "56c1d6c9b9e0feabd0d22fcb",
	interviewed: "56b8a4f7bd73d563ef52a309",
	hired: "56b8a4adc74b5f465aad5602",
	rejected: "56bb38e2c575ea2f58e23024",
	notinterested: "56bb39b91d56ccd8a899a2e0",
	hasResponse: "56c49587b04c088cf872a11d"
};

var labels = {
	contacted: "56b8a420152c3f92fde3ec07",
	hasResponse: "56b8a420152c3f92fde3ec05",
	notinterested: "56b8a420152c3f92fde3ec06",
	rejected: "56b8a420152c3f92fde3ec08",
	called: "56b8a420152c3f92fde3ec09",
	hired: "56b8a420152c3f92fde3ec0a",
	interviewed: "56c495c1152c3f92fd100d54"
};


var countLabels = function(cardTab) {
	var labelIds = Object.keys(labels).map(function(key){return labels[key]});


	for(i = 0 ; i < cardTab.length ; i++) {
		var cardLabels = cardTab[i].labels;

		for(l = 0 ; l < cardLabels.length ; l++) {
			var labelIndex = $.inArray(cardLabels[l].id, labelIds);
			if (labelIndex != -1) {
				var category = Object.keys(labels)[labelIndex];
				stats[category]++;// = stats[Object.keys(labels)[labelIndex]] + 1;
			}
		}
	}
}

var fail = function() {console.log("fail");}

var getCardsFromList = function(cardID) {
	var deferred = $.ajax({
		url: "https://api.trello.com/1/lists/"+cardID+"/cards?key=b1f2a0219e4c69b472b5721208b95535&token=4c0ab28b6f92a1f13abf9fc1e1ac3932345135a62ea248897e6f33c7c2a472c1",
       
    }).then(function(response){ 
       countLabels(response);
    });
    return deferred;
}

var displayStats = function() {
	$("#contacted").text( stats.contacted);
	$("#hasResponse").text( stats.hasResponse);
	$("#called").text( stats.called);
	$("#interviewed").text( stats.interviewed);
	$("#hired").text( stats.hired);
	$("#rejected").text( stats.rejected);
	$("#notinterested").text( stats.notinterested);
	
}

var displayChart = function() {
	var data = google.visualization.arrayToDataTable([
        ["Type", "Pourcentage", { role: "style" } ],
		["Embauches", stats.hired*1.0/stats.contacted*100, "color: #e5e4e2"],
        ["Non retenus", stats.rejected*1.0/stats.contacted*100, "color: #e5e4e2"],
        ["Non intéressés", stats.notinterested*1.0/stats.contacted*100, "color: #e5e4e2"],
        ["Entretiens présentiels", stats.interviewed*1.0/stats.contacted*100, "color: #e5e4e2"],
        ["Entretiens téléphoniques", stats.called*1.0/stats.contacted*100, "gold"],
        ["Réponses obtenues", stats.hasResponse*1.0/stats.contacted*100, "silver"],
        ["Contactés", stats.contacted*1.0/stats.contacted*100, "#b87333"]
      ]);

	var options = {
          chart: {
            title: 'Statistiques recrutement',
            subtitle: 'Résultats sur Viadéo',
          },
          bars: 'horizontal' // Required for Material Bar Charts.
        };

	var chart = new google.charts.Bar(document.getElementById("chart"));
    chart.draw(data, options);
}

var computeStats = function() {
	//stats.contacted = stats.called + stats.hasResponse + stats.interviewed + stats.hired + stats.rejected + stats.notinterested ;
}

var refreshPage = function() {
	computeStats();
	displayStats();
	displayChart();
}

var drawChart = function() {

	var d1 = getCardsFromList(lists.contacted);
	var d2 = getCardsFromList(lists.called);
	var d3 = getCardsFromList(lists.rejected);
	var d4 = getCardsFromList(lists.notinterested);
	var d5 = getCardsFromList(lists.interviewed);
	var d6 = getCardsFromList(lists.hired);
	var d7 = getCardsFromList(lists.hasResponse);

	$.when(d1, d2, d3, d4, d5, d6, d7).then(refreshPage);
}

google.charts.load('current', {packages: ['bar']});
google.charts.setOnLoadCallback(drawChart);