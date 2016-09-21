angular.module("nh")
	.controller("HouseDetailControl", [
		"$http",
		"apiUrl",
		"$routeParams",
		"LandingFactory",
		function ($http, apiUrl, $routeParams, LandingFactory) {
			const houseCtrl = this;
			houseCtrl.currentUser = LandingFactory.getUser()

			$http.get(`${apiUrl}/houses/${$routeParams.houseId}`)
				.then((res) => houseCtrl.house = res.data)

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
		}
	])
