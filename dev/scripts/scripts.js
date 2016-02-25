var app = {};
app.apiUrl = 'https://lcboapi.com/products';
app.locationApiUrl = 'https://lcboapi.com/stores';
app.apiKey = 'MDphOGNiOTY1NC1kYjBiLTExZTUtOGMzYi0zNzJlOTg1YmY5YmI6NlZjc0FzREFrUGFNSlB0OWhnWXFBWUFKbDA0OVpPMTJRbDRi';

app.googleMapsApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
;
var idNumber;

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

app.getStores = function() {
	$.ajax({
		url: app.locationApiUrl,
		dataType: 'json',
		method: 'GET',
		data: {
			per_page: 10,
			access_key: app.apiKey,
			// only get stores that stock Beau's
			product_id: idNumber
		}
	}).then(function(storeOutput) {
		console.log(storeOutput);
		app.displayStores(storeOutput);
	})
}; 

app.getLocation = function(userLocation) {
	$.ajax({
		url: app.googleMapsApiUrl,
		dataType: 'json',
		method: 'GET',
		data: {
			address: userLocation
		}
	}).then(function(showMap) {
		var locationMarker = new google.maps.
	})
}

app.displayBeer = function(beerInfo) {
	// console.log(beerInfo);
	var beerString = beerInfo.result
	$.each(beerString, function(i, data) {
		// console.log(data);
		var beerName = $('<h2>').text(data.name);
		var beerImage = $('<img>').attr('src', data.image_url);
		var packaging = data.package;
		var price = $('<p>').text("$" + data.price_in_cents/100);
		var category = data.secondary_category;
		var style = data.style;
		var tags = data.tags;
		var tastingNotes = data.tasting_note;
		var idNumber = data.id;
		// console.log(beerName);
		// console.log(beerImage);
		var namePicPrice = $('#beerResults').append(beerName, beerImage, price);
		// console.log(price);
		if (data.image_url == null) {
			$(beerImage).attr('src', 'http://unsplash.it/100/100')
		}
	});
}

app.displayStores = function(storeInfo) {
	var storeString = storeInfo.result
	// console.log(storeString);
	$.each(storeString, function(i, storeData) {
		var storeName = storeData.name;
		var storeId = storeData.id;
		var storeAddress = storeData.address_line_1 + storeData.city;
		var storePhone = storeData.telephone;
		var lat = storeData.latitude;
		var lng = storeData.longitude;

		// console.log(storeName);
		// console.log(storeAddress);
	})	
}

app.init = function() {
	app.getBeer();
	app.getStores();
}

$(function() {
	app.init();
});