angular.module("nh")
	.controller("HouseDetailControl", [
		"$http",
		"apiUrl",
		"$routeParams",
		"LandingFactory",
		function ($http, apiUrl, $routeParams, LandingFactory) {
			const houseCtrl = this;
			houseCtrl.currentUser = LandingFactory.getUser();

			$http.get(`${apiUrl}/houses/${$routeParams.houseId}`)
				.then((res) => {
					houseCtrl.house = res.data

					let buyer = houseCtrl.house.house_buyer
					let currentUserName = houseCtrl.currentUser.user.username
					let isSelling = houseCtrl.house.selling
					let hasBio = houseCtrl.currentUser.add_info.bio

					if (buyer !== null && buyer.user.username === currentUserName) {
						if (houseCtrl.house.selling === false) {
							houseCtrl.showListButton = true
						}
					} else {
						houseCtrl.showListButton = false
					};

					if (isSelling && hasBio !== undefined) {
						houseCtrl.showBuyButton = true
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
						"buyer": houseCtrl.currentUser.add_info.pk,
						"house": houseCtrl.house
					}
				})
				.then((res) => {
					console.log("RES: ", res);
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
				.then((res) => console.log("listed: ", res))
			}
		}
	])
