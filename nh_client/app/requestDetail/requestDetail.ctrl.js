angular.module("nh")
	.controller("RequestDetailControl", [
		"$http",
		"apiUrl",
		"$routeParams",
		function ($http, apiUrl, $routeParams) {
			const reqCtrl = this;

			$http.get(`${apiUrl}/house_requests/${$routeParams.requestId}`)
				.then((res) => reqCtrl.request = res.data)
		}
	])
