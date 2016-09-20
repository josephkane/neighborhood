angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/agentDetail/:agentId", {
				controller: "AgentDetailControl",
				controllerAs: "adCtrl",
				templateUrl: "app/agentDetail/agentDetail.html",
				// resolve: { requiresAuth, getLoggedInUser }
			})
	})
