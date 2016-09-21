angular.module("nh")
	.controller("LandingCtrl", [
		"$location",
		"$http",
		"apiUrl",
		"$timeout",
		"LandingFactory",
		function ($location, $http, apiUrl, $timeout, LandingFactory) {
			const landCtrl = this;
			landCtrl.isLoginVisible = false;
			landCtrl.isRegisterVisible = false;
			landCtrl.isButtonsVisible = true;

			landCtrl.showLogin = function () {
				landCtrl.isButtonsVisible = false;
				landCtrl.isRegisterVisible = false;
				landCtrl.isLoginVisible = true;
			}

			landCtrl.showRegister = function () {
				landCtrl.isButtonsVisible = false;
				landCtrl.isLoginVisible = false;
				landCtrl.isRegisterVisible = true
			}

			landCtrl.showButtons = function () {
				landCtrl.isButtonsVisible = true;
				landCtrl.isLoginVisible = false;
				landCtrl.isRegisterVisible = false
			}

			landCtrl.login = function () {
				console.log("login");
				$http({
					url: `${apiUrl}/login/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"username": landCtrl.username,
						"password": landCtrl.password,
						"user_type": landCtrl.user_type
					}
				})
				.then((res) => {
					let user = res.data[0];
					let user_info = res.data[1];
					LandingFactory.setUser(user, user_info);
					LandingFactory.setCredentials({
						"username": landCtrl.username,
						"password": landCtrl.password
					})
					if (landCtrl.user_type === "buyer") {
						$location.path(`/profile`);
					} else if (landCtrl.user_type === "agent") {
						$location.path(`/agentProfile`);
					}
					$timeout();
				})
				.catch((err) => console.log(err))
			};

			landCtrl.register = function (file) {
				let input = document.querySelector('[type="file"]');
				let image_file = input.files[0];

				let randomInteger = Math.random() * 1e17;
				let getFileExtension = image_file.type.split('/').slice(-1)[0];
				let randomPath = `${randomInteger}.${getFileExtension}`;

				firebase.storage().ref().child(randomPath).put(image_file)
					.then((res) => {
						$http({
							url: `${apiUrl}/register/`,
							method: "POST",
							headers: {"Content-type": "application/x-www-form-encoded"},
							data: {
								"username": landCtrl.userName,
								"password": landCtrl.password,
								"first_name": landCtrl.firstName,
								"last_name": landCtrl.lastName,
								"email": landCtrl.email,
								"image": res.downloadURL,
								"user_type": landCtrl.user_type,
								"bio": landCtrl.bio
							}
						})
						.then((res) => {
							console.log("res: ", res);
							let user = res.data[0];
							let user_info = res.data[1];
							LandingFactory.setUser(user, user_info);
							LandingFactory.setCredentials({
								"username": landCtrl.username,
								"password": landCtrl.password
							});
							if (landCtrl.user_type === "buyer") {
								$location.path(`/profile`);
							} else if (landCtrl.user_type === "agent") {
								$location.path(`/agentProfile`);
							}
							$timeout();
						})
						.catch((err) => console.log(err))
					})
			}
		}
	])
