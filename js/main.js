// Created reservationData object to be populated with user input
var reservationData = {};

// Initialize Firebase

var config = {
	apiKey: "AIzaSyD9542jk0eseGskR82gjh1OMWfAX98vP4M",
	authDomain: "reservation-site-55ba6.firebaseapp.com",
	databaseURL: "https://reservation-site-55ba6.firebaseio.com",
	projectId: "reservation-site-55ba6",
    storageBucket: "reservation-site-55ba6.appspot.com",
  };

firebase.initializeApp(config);

// Connect to Database
var database = firebase.database();


// Set the day when an object is clicked
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

// when submitted, name data should be set
// and all data should be sent to database
$('.reservations').on('submit', function(e) {
  e.preventDefault();

// Get name from input
reservationData.name = $('.reservation-name').val();

// Push data object to database
database.ref('reservations').push(reservationData);
});


// Update the view on initial load and addition of each reservation 
database.ref('reservations').on('child_added', function(snapshot) {
  // grab element to hook to
  var reservationList = $('.reservation-list');
  // get data from database
  var reservations = snapshot.val();
  // get your template from your script tag
  var source   = $("#reservation-template").html();
  // compile template
  var template = Handlebars.compile(source);
  // pass data to template to be evaluated within handlebars
  // as the template is created
  var reservationTemplate = template(reservations);
  // append created templated
  reservationList.append(reservationTemplate);
});


function initMap() {

	var styles = [
	{
		stylers: [
			{ hue: '#00ffe6' },
			{ saturation: -20 }
		]
	}, {
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{ lightness: 100 },
			{ visibility: 'simplified' }
		]
	}, {
		featureType: 'road',
		elementType: 'labels',
		stylers: [
		{ visibility: 'off' }
		]}];


	var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    zoomControl: false,
    scrollwheel: false,
    fullscreenControl: false,
    styles: styles
  	});

	var marker = new google.maps.Marker({
	position: {lat: 40.8054491, lng: -73.9654415},
	map: map,
	title: 'Monks Café'
	});

	var mapOptions = 
	{
  	zoomControl: boolean,
  	mapTypeControl: boolean,
  	scaleControl: boolean,
  	streetViewControl: boolean,
  	rotateControl: boolean,
  	fullscreenControl: boolean
	};
};

// initMap();