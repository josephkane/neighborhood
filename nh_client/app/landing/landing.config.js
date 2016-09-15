angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/", {
				controller: "LandingCtrl",
				controllerAs: "landCtrl",
				templateUrl: "app/landing/landing.html"
			})
	})
