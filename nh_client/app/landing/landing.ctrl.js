angular.module("nh")
	.controller("LandingCtrl", [
		"$location",
		"$http",
		"apiUrl",
		function ($location, $http, apiUrl) {
			const landCtrl = this;
			landCtrl.isLoginVisible = false;
			landCtrl.isRegisterVisible = false;

			landCtrl.showLogin = function () {
				landCtrl.isRegisterVisible = false;
				landCtrl.isLoginVisible = true;
			}

			landCtrl.showRegister = function () {
				landCtrl.isLoginVisible = false;
				landCtrl.isRegisterVisible = true
			}

			landCtrl.login = function () {
				console.log("login");
				$http({
					url: `${apiUrl}/login/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"username": landCtrl.username,
						"password": landCtrl.password
					}
				})
				.then((res) => {
					console.log("res: ", res);
				})
			}
			landCtrl.register = function () {
				console.log("register");
				$http({
					url: `${apiUrl}/create_user/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"username": landCtrl.userName,
						"password": landCtrl.password,
						"first_name": landCtrl.firstName,
						"last_name": landCtrl.lastName,
						"email": landCtrl.email,
						"user_type": landCtrl.user_type,
						"bio": landCtrl.bio
					}
				})
				.then((res) => {
					console.log("res: ", res);
				})
			}
		}])
