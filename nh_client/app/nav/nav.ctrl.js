angular.module("nh")
	.controller("NavCtrl", [
		"$location",
		"$http",
		"apiUrl",
		"$timeout",
		"LandingFactory",
		function ($location, $http, apiUrl, $timeout, LandingFactory) {
			const navCtrl = this;

			navCtrl.logout = function () {
				LandingFactory.logout();
			};
		}])
