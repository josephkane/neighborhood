angular.module("nh")
	.controller("LandingCtrl", [
		"$location",
		"$http",
		function ($location, $http) {
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
				console.log("username: ", landCtrl.username);
				console.log("password: ", landCtrl.password);
			}
			landCtrl.register = function () {
				console.log("username: ", landCtrl.username);
				console.log("password: ", landCtrl.password);
				console.log("firstName: ", landCtrl.firstName);
				console.log("lastName: ", landCtrl.lastName);
				console.log("email: ", landCtrl.email);
				console.log("bio: ", landCtrl.bio);
			}
		}])
