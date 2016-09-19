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
				.then(() => $location.path("/profile"))
				.catch((err) => console.log(err))
			}
			landCtrl.register = function (file) {
				let input = document.querySelector('[type="file"]');
				let image_file = input.files[0];

				let randomInteger = Math.random() * 1e17;
				let getFileExtension = image_file.type.split('/').slice(-1)[0];
				let randomPath = `${randomInteger}.${getFileExtension}`;

				firebase.storage().ref().child(randomPath).put(image_file)
					.then((res) => {
						console.log("RES: ", res);
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
					})
			}
			// .then((res) => {
			// 	console.log("RES: ", res);
			// 	$location.path("/profile")
			// })
			// .catch((err) => console.log(err))

			// landCtrl.register = function () {
			// 	console.log("register");

			// 	let input = document.querySelector('[type="file"]');
   //    			let file = input.files[0];
   //    			console.log("IMAGE: ", file);

			// 	$http({
			// 		url: `${apiUrl}/register/`,
			// 		method: "POST",
			// 		headers: {"Content-type": "application/x-www-form-encoded"},
			// 		data: {
			// 			"username": landCtrl.userName,
			// 			"password": landCtrl.password,
			// 			"first_name": landCtrl.firstName,
			// 			"last_name": landCtrl.lastName,
			// 			"email": landCtrl.email,
			// 			"image": file,
			// 			"user_type": landCtrl.user_type,
			// 			"bio": landCtrl.bio
			// 		}
			// 	})
			// 	.then(() => $location.path("/profile"))
			// 	.catch((err) => console.log(err))
			// }
		}])
