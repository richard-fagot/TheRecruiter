var storeCandidats = function() {
	console.log("store candidats");

	chrome.storage.local.get('candidats', function(data) {
		
		var vault = data.candidats;
		
		var newCandidats = getCandidats();

		if(! (vault === undefined)) {
			newCandidats = newCandidats.concat(vault);
		}

		console.log("Now there are : " + newCandidats.length);

		chrome.storage.local.set({'candidats':newCandidats}, function() {console.log("Success")});


	});
	
}

var getProfileID = function(searchPageProfileUrl) {
	/profile\/(.*)\?/.exec(searchPageProfileUrl);
	return RegExp.$1;
}

var getCandidats = function() {
	var candidats = $(".pbxs .fullname > a").map(function() {return getProfileID($(this).attr("href"))}).get();
	console.log("There are new candidats : " + candidats);
	return candidats;
}



var initPage = function() {
	console.log("Page initialization");
	

	/*
		Ajoute un bouton pour supprimer un candidat du champ de recherche
	*/
	$("h2.fullname:has(a)").append('<button class="btn btn-secondary notrelevant">X</button>');
	$(".notrelevant").on('click', function(event) {
		// parent = $(event.target).parent();
		profileURL = $(event.target).siblings('a').attr('href');

		// /profile\/(.*)\?/.exec(profileURL);
		// profileID = RegExp.$1;
		profileID = getProfileID(profileURL);

		storeNotRelevant(profileID);
		$(event.target).parents(".profile-card__overview").html("")
	});


	/*
		Nettoye la page de tous les candidats qu'on considère comme hors périmètre.
	*/
	chrome.storage.local.get('notrelevant', function(data) {
			
			var vault = data.notrelevant;
			
			if(!(vault === undefined)) {

				candidats = getCandidats();

				for(i = 0 ; i < candidats.length ; i++) {
					console.log("Check if is not relevant : '" + candidats[i] + "' " + $.inArray(candidats[i], vault));
					if($.inArray(candidats[i], vault) != -1) {
						$("h2.fullname:has(a) a[href*='"+candidats[i]+"']").parents(".profile-card__overview").html("")
					}
				}
			}
	});
};

window.setTimeout(initPage, 2000);
//initPage();



// // chrome.storage.local.clear();
// console.log("Get first result page");
// storeCandidats();
// var next = $("li:not(.disabled):has(.btn-pagination:has(span):contains(suivant)) > a")[0];
// if(!(next === undefined)) {
// 	next.click();
// }
// console.log(next);
// console.log("Get second result page");
// window.setTimeout(storeCandidats,2000);
// // storeCandidats();

