angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/convoDetail/:convoId", {
				controller: "ConvoDetailCtrl",
				controllerAs: "convoCtrl",
				templateUrl: "app/convoDetail/convoDetail.html",
				// resolve: { requiresAuth, getLoggedInUser }
			})
	})
