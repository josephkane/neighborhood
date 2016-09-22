angular.module("nh")
	.controller("RequestDetailControl", [
		"$http",
		"apiUrl",
		"$routeParams",
		"LandingFactory",
		function ($http, apiUrl, $routeParams, LandingFactory) {
			const reqCtrl = this;
			reqCtrl.currentUser = LandingFactory.getUser()

			$http.get(`${apiUrl}/house_requests/${$routeParams.requestId}`)
				.then((res) => reqCtrl.request = res.data)

			reqCtrl.showMessageButton = true

			reqCtrl.createConvo = function () {
				$http({
					url: `${apiUrl}/create_new_conversation/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"agent": reqCtrl.currentUser.add_info.id,
						"buyer": reqCtrl.request.request_buyer.id,
						"request": reqCtrl.request.id,
						"author": reqCtrl.currentUser.user.username,
						"recipient": reqCtrl.request.request_buyer.user.username,
						"text": reqCtrl.text,
					}
				})
				.then((res) => {
					console.log("response: ", res);
				})
			}
		}
	])
