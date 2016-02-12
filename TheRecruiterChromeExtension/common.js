var storeNotRelevant = function(profileID) {
	chrome.storage.local.get('notrelevant', function(data) {
		
		var vault = data.notrelevant;
		
		if(vault === undefined) {
			vault = [];
		}
		
		if(vault.indexOf(profileID) == -1) {
			vault.push(profileID);
			console.log(vault);
			chrome.storage.local.set({'notrelevant':vault}, function() {console.log(profileID + " added to not relevant profiles");});
		}

	});
}

var storeContacted = function(profileID) {
	chrome.storage.local.get('contacted', function(data) {
		
		var vault = data.contacted;
		
		if(vault === undefined) {
			vault = [];
		}
		
		if(vault.indexOf(profileID) == -1) {
			vault.push(profileID);
			console.log(vault);
			chrome.storage.local.set({'contacted':vault}, function() {console.log(profileID + " added to contacted profiles");});
		}

	});
}