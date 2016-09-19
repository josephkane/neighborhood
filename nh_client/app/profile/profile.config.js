let requiresAuth = ($location, LandingFactory) => new Promise((resolve, reject) => {
	if (LandingFactory.getCredentials()) {
    	console.log("User is authenticated, resolve route promise");
    	resolve();
    } else {
    	console.log("User is not authenticated, reject route promise");
    	reject();
    	$location.path("/");
	}
});


angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/profile", {
				controller: "ProfileCtrl",
				controllerAs: "profCtrl",
				templateUrl: "app/profile/profile.html",
				resolve: { requiresAuth }
			})
	})
