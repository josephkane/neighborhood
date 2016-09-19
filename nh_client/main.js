angular.module("nh", ["ngRoute", "ngCookies"])
	.constant("apiUrl", "http://localhost:8000")
	// .constant("FBUrl", "http://localhost:8000")

	// allows django & angular to pass csrf token in header of XHR instead of bundled with django templates
	.config($httpProvider => {
    	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	});

firebase.initializeApp({
	apiKey: "AIzaSyANGk9Up_VDGDqnr5xplWcBQSYzkSB7be8",
    authDomain: "neighborhood-f9998.firebaseapp.com",
    databaseURL: "https://neighborhood-f9998.firebaseio.com",
    storageBucket: "neighborhood-f9998.appspot.com",
    messagingSenderId: "248423265813"
})
