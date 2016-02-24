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
			q: 'beaus',
			// where_not: 'is_discontinued'
			// order: price_in_cents, volume_in_milliliters,alcohol_content
		}
	}).then(function(beerOutput){
		// console.log(beerOutput);
		app.displayBeer(beerOutput);
	})
	// console.log(data.name)
};

app.displayBeer = function(beerInfo) {
	console.log(beerInfo);
	var beerString = beerInfo.result
	$.each(beerString, function(i, data) {
		// console.log(data);
		var beerName = data.name;
		var beerImage = data.image_url;
		var packaging = data.package;
		var price = "$" + data.price_in_cents/100;
		var category = data.secondary_category;
		var style = data.style;
		var tags = data.tags;
		var tastingNotes = data.tasting_note;
		var idNumber = data.id;
		console.log(beerName);
		console.log(beerImage);
		// console.log(price);

	});
}

app.init = function() {
	app.getBeer();
}

$(function() {
	app.init();
});