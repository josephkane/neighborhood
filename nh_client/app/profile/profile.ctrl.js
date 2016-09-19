angular.module("nh")
	.controller("ProfileCtrl", [
		"$location",
		"$http",
		"apiUrl",
		"LandingFactory",
		"$timeout",
		function ($location, $http, apiUrl, LandingFactory, $timeout) {
			const profCtrl = this;
			profCtrl.houseRequestFormIsVisible = false;
			let user = LandingFactory.getUser()
			console.log("user: ", user);
			profCtrl.user = user.user

			$http.get(`${apiUrl}/neighborhoods`)
				.then((res) => {
					console.log("neighborhoods: ", res);
					profCtrl.neighborhoodsArray = res.data.map((n) => n.name);
					$timeout();
				})
				// .then($timeout)

			profCtrl.showHouseRequestForm = function () {
				profCtrl.houseRequestFormIsVisible = true;
			}

			profCtrl.cancelHouseRequestForm = function () {
				profCtrl.houseRequestFormIsVisible = false;
			}

		}
	])
