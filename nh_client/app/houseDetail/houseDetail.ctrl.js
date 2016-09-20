angular.module("nh")
	.controller("HouseDetailControl", [
		"ProfileFactory",
		function (ProfileFactory) {
			const houseCtrl = this;

			houseCtrl.house = ProfileFactory.getHouse()
			console.log("house: ", houseCtrl.house);
		}
	])
