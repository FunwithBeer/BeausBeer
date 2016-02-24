var app = {};
app.apiUrl = 'https://lcboapi.com/products';
app.apiKey = "MDphOGNiOTY1NC1kYjBiLTExZTUtOGMzYi0zNzJlOTg1YmY5YmI6NlZjc0FzREFrUGFNSlB0OWhnWXFBWUFKbDA0OVpPMTJRbDRi";

app.getBeer = function() {
	$.ajax({
		url: app.apiUrl,
		dataType: 'json',
		method: 'GET',
		data: {
			per_page: 50,
			access_key: app.apiKey,
			q: 'beaus'
			// order: price_in_cents, volume_in_milliliters,alcohol_content
		}
	}).then(function(results){
		console.log(results);
	})
	// console.log(data.name)
};


app.init = function() {
	app.getBeer();
}

$(function() {
	app.init();
});