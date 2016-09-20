angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/agentProfile", {
				controller: "AgentCtrl",
				controllerAs: "agentCtrl",
				templateUrl: "app/agentProfile/agentProfile.html",
				// resolve: { requiresAuth, getLoggedInUser }
			})
	})
