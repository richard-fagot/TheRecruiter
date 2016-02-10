var request = require('request');
var cheerio = require('cheerio');

var credentials = {
	username: 'richard.fagot@gmail.com',
	password: 'khoumesef'
};

request.post({
  	uri: 'https://secure.viadeo.com/fr/signin',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
	body: require('querystring').stringify(credentials)
}, function(err, res, body){
	if(err) {
		callback.call(null, new Error('Login failed'));
		return;
	}

	console.log(body);
});