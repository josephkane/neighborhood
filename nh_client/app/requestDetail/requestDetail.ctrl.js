angular.module("nh")
	.controller("RequestDetailControl", [
		"$http",
		"apiUrl",
		"AgentProfileFactory",
		function ($http, apiUrl, AgentProfileFactory) {
			const reqCtrl = this;

			reqCtrl.request = AgentProfileFactory.getRequest()
			console.log("req: ", reqCtrl.request);
		}
	])
