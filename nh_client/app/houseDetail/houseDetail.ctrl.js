angular.module("nh")
	.controller("HouseDetailControl", [
		"$http",
		"apiUrl",
		"$routeParams",
		function ($http, apiUrl, $routeParams) {
			const houseCtrl = this;

			$http.get(`${apiUrl}/houses/${$routeParams.houseId}`)
				.then((res) => houseCtrl.house = res.data)
		}
	])












// angular.module("nh")
// 	.controller("HouseDetailControl", [
// 		"ProfileFactory",
// 		function (ProfileFactory) {
// 			const houseCtrl = this;

// 			houseCtrl.house = ProfileFactory.getHouse()
// 		}
// 	])
