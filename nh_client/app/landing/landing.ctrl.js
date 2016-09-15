angular.module("nh")
	.controller("LandingCtrl", [
		"$location",
		"$http",
		function ($location, $http) {
			const landCtrl = this;
			landCtrl.login = false;
			landCtrl.register = false;

			landCtrl.showLogin = function () {
				landCtrl.register = false;
				landCtrl.login = true;
			}

			landCtrl.showRegister = function () {
				landCtrl.login = false;
				landCtrl.register = true
			}
		}])
