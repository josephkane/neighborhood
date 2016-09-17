angular.module("nh", ["ngRoute", "ngFileUpload"])
	.constant("apiUrl", "http://localhost:8000")

	// allows django & angular to pass csrf token in header of XHR instead of bundled with django templates
	.config($httpProvider => {
    	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	});
