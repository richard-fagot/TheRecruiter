var storeCandidats = function() {
	chrome.storage.local.get('candidats', function(data) {
		
		var vault = data.candidats;
		
		var newCandidats = getCandidats();

		newCandidats = newCandidats.concat(vault);

		console.log("Now there are : " + newCandidats.length);

		chrome.storage.local.set({'candidats':newCandidats}, function() {console.log("Success")});


	});
	
}


var getCandidats = function() {
	var candidats = $(".fullname > a").map(function() {return $(this).attr("href")}).get();
	console.log("There are new candidats : " + candidats.length);

	console.log ("Candidats is an array : " + (candidats.constructor === Array));
	return candidats;
}




/*chrome.storage.local.clear();
console.log("Get first result page");
storeCandidats();*/
//$(".btn-pagination:has(span):contains(suivant)")[0].click();
// var next = $("li:not(.disabled):has(.btn-pagination:has(span):contains(suivant)) > a")[0];
// if(!(next === undefined)) {
// 	next.click();
// }
// console.log(next);
/*console.log("Get second result page");
storeCandidats();
*/
