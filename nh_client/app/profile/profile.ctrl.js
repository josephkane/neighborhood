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

			profCtrl.user = LandingFactory.getUser()

			profCtrl.messages = []

			// let user = LandingFactory.getUser()
			// profCtrl.user = user.user

			$http.get(`${apiUrl}/neighborhoods`)
				.then((res) => {
					profCtrl.neighborhoodsArray = res.data;
				})

			$http.get(`${apiUrl}/houses/?buyer_id=${profCtrl.user.add_info.id}`)
				.then((res) => profCtrl.myHouses = res.data)

			// factory not necessary, refator this later
			ProfileFactory.getHouseRequests(profCtrl.user.add_info)
				.then((res) => profCtrl.requests = res);

			// factory not necessary, refator this later
			ProfileFactory.getHousesForSale()
				.then((res) => {
					profCtrl.housesForSale = res;
					$timeout();
				})

			$http.get(`${apiUrl}/conversations/?convo_buyer=${profCtrl.user.user.username}`)
				.then((res) => profCtrl.convos = res.data)



			profCtrl.showHouseRequestForm = function () {
				profCtrl.houseRequestFormIsVisible = true;
			}

			profCtrl.cancelHouseRequestForm = function () {
				profCtrl.bed = null;
				profCtrl.bath = null;
				profCtrl.sq_ft = null;
				profCtrl.budget = null;
				profCtrl.neighborhood = null;
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
						"neighborhood": profCtrl.requestedNeighborhood.id,
						"buyer": profCtrl.user.add_info.id
					}
				})
				.then((res) => {
					ProfileFactory.getHouseRequests(profCtrl.user.add_info)
					.then((res) => {
						profCtrl.requests = res;
					})
				})
			}

			profCtrl.showRequest = function (request_id) {
				$location.path(`/requestDetail/${request_id}`);
			}

			profCtrl.showHouse = function (house_id) {
				$location.path(`/houseDetail/${house_id}/`)
			}

			profCtrl.showConvo = function (convo_id) {
				$location.path(`/convoDetail/${convo_id}`)
			}

		}
	])
