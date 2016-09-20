angular.module("nh")
	.controller("AgentCtrl", [
		"$location",
		"$http",
		"apiUrl",
		"LandingFactory",
		"$timeout",
		"AgentProfileFactory",
		function ($location, $http, apiUrl, LandingFactory, $timeout, AgentProfileFactory) {
			const agentCtrl = this;
			agentCtrl.newHouseFormIsVisible = false;

			let user = LandingFactory.getUser()
			agentCtrl.user = user.user

			$http.get(`${apiUrl}/neighborhoods`)
				.then((res) => {
					agentCtrl.neighborhoodsArray = res.data;
				})

			AgentProfileFactory.getListedHouses(user.add_info)
				.then((res) => agentCtrl.houses = res);

			AgentProfileFactory.getHouseRequests()
				.then((res) => agentCtrl.requests = res)

			agentCtrl.showNewHouseForm = function () {
				agentCtrl.newHouseFormIsVisible = true;
			}

			agentCtrl.cancelNewHouseForm = function () {
				agentCtrl.address = null;
				agentCtrl.bed = null;
				agentCtrl.bath = null;
				agentCtrl.sq_ft = null;
				agentCtrl.lot_size = null;
				agentCtrl.yr_built = null;
				agentCtrl.description = null;
				agentCtrl.price = null;
				agentCtrl.newHouseFormIsVisible = false;

			}

			agentCtrl.submitNewHouse = function (file) {
				let input = document.querySelector('[type="file"]');
				let image_file = input.files[0];
				let randomInteger = Math.random() * 1e17;
				let getFileExtension = image_file.type.split('/').slice(-1)[0];
				let randomPath = `${randomInteger}.${getFileExtension}`;

				firebase.storage().ref().child(randomPath).put(image_file)
					.then((res) => {
						$http({
							url: `${apiUrl}/create_new_house/`,
							method: "POST",
							headers: {"Content-type": "application/x-www-form-encoded"},
							data: {
								"address": agentCtrl.address,
								"bed": agentCtrl.bed,
								"bath": agentCtrl.bath,
								"sq_ft": agentCtrl.sq_ft,
								"lot_size": agentCtrl.lot_size,
								"yr_built": agentCtrl.yr_built,
								"lot_size": agentCtrl.lot_size,
								"price": agentCtrl.price,
								"description": agentCtrl.description,
								"image": res.downloadURL,
								"neighborhood": agentCtrl.listedNeighborhood,
								"agent": user.add_info
							}
						})
					})
			}
	}])
