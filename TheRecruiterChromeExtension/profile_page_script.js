var getProfileID = function() {
	/^\/p\/(.*)/.exec(window.location.pathname);
	return RegExp.$1;
};

var addToContacted = function() {
	profileID = getProfileID();
	storeContacted(profileID);
};

var initPage = function() {
	/*
		Ajoute le bouton de suppression du profil des résultats de recherche.
		Cela se retrouve aussi sur le profil "volant".
	*/
	$("aside.profile-actions").prepend('<button class="btn btn-secondary notrelevant">X</button>');
	$(".notrelevant").on('click', function(event) {
			
			// /^\/p\/(.*)/.exec(window.location.pathname);
			// profileID = RegExp.$1;
			profileID = getProfileID();

			storeNotRelevant(profileID);
			$(".profile-fullName").css('text-decoration', 'line-through')
	});

	/*
		Flag le profil en "déjà contacté" quand on clique sur le bouton pour envoyer un message.
		Cela se retrouve aussi sur le profil "volant".
	*/
	$(".profile-action-message")
	.map(
		function() {
			$(this).on('click', function(event) {
				addToContacted();
				if($("#contacted").length == 0) {
					$(".profile-fullName").append('<button id="contacted" class="btn btn-secondary">Déjà contacté</button>');
				}
			});
		}
	)	;

	/*
		Ajoute le flag "déjà contacté" le cas échéant.
	*/
	chrome.storage.local.get('contacted', function(data) {
		
		var vault = data.contacted;
		
		if(vault === undefined) {
			vault = [];
		}

		if(vault.indexOf(getProfileID()) != -1) {
			$(".profile-fullName").append('<button id="contacted" class="btn btn-secondary">Déjà contacté</button>')
		}

	});
};



window.setTimeout(initPage, 2000);