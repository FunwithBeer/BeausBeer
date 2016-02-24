// set up beer app
var boozeOutput = {};

boozeOutput.apiKey = 'MDphOGNiOTY1NC1kYjBiLTExZTUtOGMzYi0zNzJlOTg1YmY5YmI6NlZjc0FzREFrUGFNSlB0OWhnWXFBWUFKbDA0OVpPMTJRbDRi';

boozeOutput.apiUrl = 'https://lcboapi.com/products';

// get information from LCBO API
boozeOutput.getInfo = function () {
	$.ajax ({
		url: boozeOutput.apiUrl,
		data: {
			per_page: 50,
			access_key: boozeOutput.apiKey,
			q: 'beaus'
		}
	}).then(function(results) {
		console.log(results);
		boozeOutput.displayBooze(results);
	})
}

