'use strict';

var app = {};
app.apiUrl = 'https://lcboapi.com/products';
app.locationApiUrl = 'https://lcboapi.com/stores';
app.inventoryUrl = 'https://lcboapi.com/inventories';
app.apiKey = 'MDphOGNiOTY1NC1kYjBiLTExZTUtOGMzYi0zNzJlOTg1YmY5YmI6NlZjc0FzREFrUGFNSlB0OWhnWXFBWUFKbDA0OVpPMTJRbDRi';

app.googleMapsApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
var idNumber;

app.getBeer = function () {
	$.ajax({
		url: app.apiUrl,
		dataType: 'json',
		method: 'GET',
		data: {
			per_page: 50,
			access_key: app.apiKey,
			q: 'beaus',
			where_not: 'is_dead',
			order: 'price_in_cents.asc'
		}
	}).then(function (beerOutput) {
		// console.log(beerOutput);
		app.displayBeer(beerOutput);
		// for (item in data.result) {
		// 	// console.log(data.result[item].producer_name);
		// 	// if ((data.result[item].quantity > 0);
		// 		if ((data.result[item].primary_category === "Beer")
		// 		&& (data.result[item].producer_name === "Beau's All Natural Brewing")) {
		// 	app.allBeerData.push(data.result[item]);
		// 	app.beerProductIDs.push(data.result[item].id);
		// app.appendBeerData();
		// }
		// }
	});
};

app.displayBeer = function (beerInfo) {
	// console.log(beerInfo);
	var beerString = beerInfo.result;
	$.each(beerString, function (i, value) {
		var beerName = $('<h2>').text(value.name);
		if (value.image_url === null) {
			// console.log('null', value);
			var beerImage = $('<img>').attr('src', '/public/images/default_beer.png');
		} else {
			var beerImage = $('<img>').attr('src', value.image_url);
		};
		var packaging = $('<p>').text(value.package);
		var price = $('<p>').text('$' + value.price_in_cents / 100);
		var category = value.secondary_category;
		if (value.style !== null) {
			var style = $('<p>').text(value.style);
			// $('<p>').text("N/A");
		} else {
				$('<p>').text('Delicious!');
				// var style = $('<p>').text(value.style);
			};
		// var tags = value.tags;
		if (value.tasting_note === null) {
			$('<p>').text('Description coming soon!');
		} else {
			var tastingNotes = $('<p>').text(value.tasting_note);
		};
		app.productIDs = value.id;
		var beerDetails = $('<div>').append(beerName, packaging, price, tastingNotes, style);
		var radioButton = $('<div><input name="beer" class="radios" type=\'radio\' value="' + value.id + '">');
		var $userBeerSelection = $('<div>');
		var $label = $('<label>').addClass('labels').attr('for', value.id);
		$label.append(beerImage);
		$userBeerSelection.append($label);
		$('#beerChoice').append(radioButton, $userBeerSelection, beerDetails);
		// app.getStores(app.productIDs);
	});
};
// I wasn't able to use the variable name in my form stuff, but why?
// If statements are not working, so n/a image won't show.
// Also, push the productIDs into an empty array?

// app.formInput = function() {
// }

app.getStores = function () {
	$.ajax({
		// url: 'https://lcboapi.com/stores?product_id=' + app.productID,
		url: app.locationApiUrl,
		dataType: 'jsonp',
		method: 'GET',
		data: {
			per_page: 10,
			access_key: app.apiKey,
			// order: 'distance_in_meters',
			lat: app.lat,
			lon: app.lng,
			// only get stores that stock Beau's
			product_id: app.beerSelected
		}
	}).then(function (storeOutput) {
		console.log(storeOutput);
		app.displayStores(storeOutput);
	});
};

app.displayStores = function (storeInfo) {
	var storeString = storeInfo.result;
	// console.log(storeString);
	$.each(storeString, function (i, storeData) {
		var storeName = storeData.name;
		var storeId = storeData.id;
		var storeAddress = storeData.address_line_1 + storeData.city;
		var storePhone = storeData.telephone;
		var lat = storeData.latitude;
		var lng = storeData.longitude;
		var marker = new google.maps.Marker({
			map: map,
			position: {
				lat: storeData.latitude,
				lng: storeData.longitude
			}
		});
		// console.log(storeName);
		// console.log(storeAddress);
	});
};

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 43.7000, lng: -79.4000 },
		zoom: 12
	});
}

// app.getLocation = function(userLocation) {
// 	$.ajax({
// 		url: app.googleMapsApiUrl,
// 		dataType: 'json',
// 		method: 'GET',
// 		data: {
// 			address: userLocation
// 		}
// 	}).then(function(showMap) {
// 		var locationMarker = new google.maps.
// 	})
// };

// get user location based on their current location
app.getCurrentPosition = function () {
	// console.log("entered get current pos")
	navigator.geolocation.getCurrentPosition(function (position) {
		app.lat = position.coords.latitude;
		app.lng = position.coords.longitude;
		app.position = { lat: app.lat, lng: app.lng };
		// console.log(app.position);
		// app.findStore();
		// app.loadMap();
		var coordinates = new google.maps.LatLng(app.lat, app.lng);
		var infoWindow = new google.maps.InfoWindow({ map: map });
		infoWindow.setPosition(coordinates);
		infoWindow.setContent('You are here!');
		map.setCenter(coordinates);
		// var marker = new google.maps.Marker({
		// position: coordinates,
		// map: map,
		// title:"You are here!"
		// });
	});
};

app.init = function () {
	app.getBeer();
	// app.getInventory();
	app.getCurrentPosition();
	$('#userBeerSelection').on('submit', function (e) {
		e.preventDefault();
		app.beerSelected = $('input[name=beer]:checked').val();
		console.log(app.beerSelected);
		app.getStores();
		// app.productID = [];
		// We need to grab the product ID Number on submit and push it into our app.productID
		// for (i = 0; i < store)
	});
};

$(function () {
	app.init();
});

app.getInventory = function () {
	$.ajax({
		url: app.inventoryUrl,
		dataType: 'json',
		method: 'GET',
		data: {
			access_key: app.apiKey,
			product_id: 169334,
			store_id: 10
		}
	}).then(function (inventoryOutput) {
		// console.log(inventoryOutput);
		for (item in beerInfo.result) {}
	});
};