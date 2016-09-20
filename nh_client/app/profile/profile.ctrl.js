angular.module("nh")
	.controller("ProfileCtrl", [
		"$location",
		"$http",
		"apiUrl",
		"LandingFactory",
		"$timeout",
		"ProfileFactory",
		function ($location, $http, apiUrl, LandingFactory, $timeout, ProfileFactory) {
			const profCtrl = this;
			profCtrl.houseRequestFormIsVisible = false;

			let user = LandingFactory.getUser()
			profCtrl.user = user.user

			$http.get(`${apiUrl}/neighborhoods`)
				.then((res) => {
					profCtrl.neighborhoodsArray = res.data;
				})

			ProfileFactory.getHouseRequests(user.add_info)
				.then((res) => profCtrl.requests = res);

			ProfileFactory.getHousesForSale()
				.then((res) => {
					profCtrl.housesForSale = res;
					$timeout();
				})

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
				.then((res) => {
					ProfileFactory.getHouseRequests(user.add_info)
					.then((res) => {
						profCtrl.requests = res;
					})
				})
			}

			profCtrl.showHouse = function (house_id) {
				$location.path(`/houseDetail/${house_id}/`)
			}

		}
	])
