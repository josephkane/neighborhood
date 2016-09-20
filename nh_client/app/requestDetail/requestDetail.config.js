angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/requestDetail", {
				controller: "RequestDetailControl",
				controllerAs: "reqCtrl",
				templateUrl: "app/requestDetail/requestDetail.html",
				// resolve: { requiresAuth, getLoggedInUser }
			})
	})
