angular.module("nh")
	.controller("HouseDetailControl", [
		"$http",
		"apiUrl",
		"$routeParams",
		"LandingFactory",
		"$location",
		"$timeout",
		function ($http, apiUrl, $routeParams, LandingFactory, $location, $timeout) {
			const houseCtrl = this;
			houseCtrl.currentUser = LandingFactory.getUser();

			$http.get(`${apiUrl}/houses/${$routeParams.houseId}`)
				.then((res) => {
					houseCtrl.house = res.data

					let buyer = houseCtrl.house.house_buyer
					let currentUserName = houseCtrl.currentUser.user.username
					let isSelling = houseCtrl.house.selling
					let currentUserType = houseCtrl.currentUser.add_info.user_type

					if (buyer !== null && buyer.user.username === currentUserName) {
						if (isSelling === false) {
							houseCtrl.showListButton = true
						}
					} else {
						houseCtrl.showListButton = false
					};

					if (isSelling && currentUserType !== "agent") {
						if (buyer !== null && currentUserName !== buyer.user.username) {
							houseCtrl.showBuyButton = true
						} else if (buyer === null) {
							houseCtrl.showBuyButton = true
						}
					} else {
						houseCtrl.showBuyButton = false
					};
				})

			$http.get(`${apiUrl}/agents/`)
				.then((res) => houseCtrl.agents = res.data)

			houseCtrl.buyHouse = function () {
				$http({
					url: `${apiUrl}/create_new_sale/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"buyer": houseCtrl.currentUser.add_info.id,
						"house": houseCtrl.house
					}
				})
				.then((res) => {
					console.log("RES: ", res);
					$location.path("/profile");
					$timeout()
				})
			}

			houseCtrl.listHouse = function () {
				$http({
					url: `${apiUrl}/list_house/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"house": houseCtrl.house.id,
						"agent": houseCtrl.listingAgent,
						"price": houseCtrl.price,
					}
				})
				.then((res) => {
					console.log("RES: ", res);
					$location.path("/profile");
					$timeout()
				})
			}
		}
	])
