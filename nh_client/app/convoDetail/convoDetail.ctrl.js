angular.module("nh")
	.controller("ConvoDetailCtrl", [
		"$http",
		"$location",
		"$routeParams",
		"apiUrl",
		function ($http, $location, $routeParams, apiUrl) {
			const convoCtrl = this;

			$http.get(`${apiUrl}/conversations/${$routeParams.convoId}/`)
				.then((res) => convoCtrl.convo = res.data);

		}
	])
