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
				profCtrl.bed = null;
				profCtrl.bath = null;
				profCtrl.sq_ft = null;
				profCtrl.budget = null;
				profCtrl.neighborhood = null;
				profCtrl.houseRequestFormIsVisible = false;
			}

			profCtrl.submitHouseRequest = function () {
				console.log("request!");
				$http({
					url: `${apiUrl}/new_house_request/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"bed": profCtrl.bed,
						"bath": profCtrl.bath,
						"sq_ft": profCtrl.sq_ft,
						"budget": profCtrl.budget,
						"neighborhood": profCtrl.requestedNeighborhood,
						"buyer": user.add_info
					}
				})
			}

		}
	])
