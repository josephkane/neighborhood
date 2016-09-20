angular.module("nh")
	.controller("AgentDetailControl", [
		"$http",
		"$location",
		"$routeParams",
		"apiUrl",
		function ($http, $location, $routeParams, apiUrl) {
			const adCtrl = this;

			$http.get(`${apiUrl}/agents/${$routeParams.agentId}/`)
				.then((res) => {
					adCtrl.agent = res.data;
					console.log("agent: ", adCtrl.agent);
				});
		}
	])
