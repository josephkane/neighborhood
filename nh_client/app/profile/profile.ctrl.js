angular.module("nh")
	.controller("ProfileCtrl", [
		"$location",
		"$http",
		"apiUrl",
		"LandingFactory",
		function ($location, $http, apiUrl, LandingFactory) {
			const profCtrl = this;

			let currentCreds = LandingFactory.getCredentials()
			currentCreds = currentCreds.toString().split(":")
			console.log("CREDS: ", currentCreds);
			let user = $http.get(`${apiUrl}/users/?username=${currentCreds[0]}`)
			console.log("USER: ", user);
			// let user = $http.get(`${apiUrl}/${$routeParams.userType}/?username=${currentCreds[0]}`)
		}
	])
