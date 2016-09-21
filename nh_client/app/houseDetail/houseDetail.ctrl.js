angular.module("nh")
	.controller("HouseDetailControl", [
		"$http",
		"apiUrl",
		"$routeParams",
		"LandingFactory",
		function ($http, apiUrl, $routeParams, LandingFactory) {
			const houseCtrl = this;

			$http.get(`${apiUrl}/houses/${$routeParams.houseId}`)
				.then((res) => houseCtrl.house = res.data)

			houseCtrl.buyHouse = function () {
				let user = LandingFactory.getUser()
				$http({
					url: `${apiUrl}/create_new_sale/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"buyer": user.add_info.pk,
						"house": houseCtrl.house
					}
				})
				.then((res) => {
					console.log("RES: ", res);
				})
			}
		}
	])
