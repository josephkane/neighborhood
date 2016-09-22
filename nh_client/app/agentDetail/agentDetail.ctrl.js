angular.module("nh")
	.controller("AgentDetailControl", [
		"$http",
		"$location",
		"$routeParams",
		"apiUrl",
		function ($http, $location, $routeParams, apiUrl) {
			const adCtrl = this;

			$http.get(`${apiUrl}/agents/${$routeParams.agentId}/`)
				.then((res) => adCtrl.agent = res.data);

			$http.get(`${apiUrl}/houses/?agent_id=${$routeParams.agentId}`)
				.then((res) => adCtrl.houses = res.data)

			$http.get(`${apiUrl}/house_sales/?agent_id=${$routeParams.agentId}`)
				.then((res) => adCtrl.sales = res.data)

			adCtrl.routeToHouse = function (houseId) {
				console.log("fired");
				$location.path(`/houseDetail/${houseId}`)
			}
		}
	])
