// set up beer app
var boozeOutput = {};

boozeOutput.apiKey = 'MDoxNjU2NzBjYy1kOWMyLTExZTUtODBhOS1jMzQ4YTY5Nzc5OTc6QVBsb0RDTzF6dE9FQ0F0UGNYQjBUM3BUb0xyUWFuRW1Mc29I';

boozeOutput.apiUrl = 'https://lcboapi.com/products';

// get information from LCBO API
boozeOutput.getInfo = function () {
	$.ajax ({
		url: boozeOutput.apiUrl,
		method: 'GET',
		dataType: 'json',
		data: {
			producer_name: 'Beau\'s All Natural Brewing'
		}
	}).then(function(results) {
		console.log(results);
		boozeOutput.displayBooze(results);
	})
}

