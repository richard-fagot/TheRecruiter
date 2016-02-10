var request = require('request');

console.log('Hello World');

request(
{
	followAllRedirects: true,
    url: 'https://secure.viadeo.com/fr/signin', //URL to hit
    //qs: {from: 'blog example', time: +new Date()}, //Query string data
    method: 'POST',
    //Lets post the following key/values as form
    form: {
        email: 'richard.fagot@gmail.com',
        password: 'khoumesef'
    }
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Modulus homepage.
    } else {console.log(body)}
});

