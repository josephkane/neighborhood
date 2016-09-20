angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/houseDetail", {
				controller: "HouseDetailControl",
				controllerAs: "houseCtrl",
				templateUrl: "app/houseDetail/houseDetail.html",
				// resolve: { requiresAuth, getLoggedInUser }
			})
	})
