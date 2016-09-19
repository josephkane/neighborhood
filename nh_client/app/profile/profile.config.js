angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/:userType/profile", {
				controller: "ProfileCtrl",
				controllerAs: "profCtrl",
				templateUrl: "app/profile/profile.html"
			})
	})
