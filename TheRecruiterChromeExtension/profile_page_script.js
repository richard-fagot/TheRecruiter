var getProfileID = function() {
	/^\/p\/(.*)/.exec(window.location.pathname);
	return RegExp.$1;
};

var addToContacted = function() {
	profileID = getProfileID();
	storeContacted(profileID);
};

var initPage = function() {
	$("aside.profile-actions").prepend('<button class="btn btn-secondary notrelevant">X</button>');
	$(".notrelevant").on('click', function(event) {
			
			// /^\/p\/(.*)/.exec(window.location.pathname);
			// profileID = RegExp.$1;
			profileID = getProfileID();

			storeNotRelevant(profileID);
			$(".profile-fullName").css('text-decoration', 'line-through')
	});

	$(".profile-action-message").map($(this).on('click', function(event) {
		addToContacted();
	}))	;
};



window.setTimeout(initPage, 2000);