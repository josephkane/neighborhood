angular.module("mh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/", {
				controller: "LandingCtrl",
				controllerAs: "landCtrl",
				templateUrl: "landing.html"
			})
	})
