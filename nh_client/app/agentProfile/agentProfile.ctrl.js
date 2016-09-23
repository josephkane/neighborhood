angular.module("nh")
	.controller("AgentCtrl", [
		"$http",
		"apiUrl",
		"$location",
		"LandingFactory",
		"AgentProfileFactory",
		function ($http, apiUrl, $location, LandingFactory, AgentProfileFactory) {
			const agentCtrl = this;
			agentCtrl.metrics = {
				number_of_sales: 0,
				total_sales: 0
			}

			let user = LandingFactory.getUser();
			agentCtrl.user = user.user;

			$http.get(`${apiUrl}/neighborhoods`)
				.then((res) => {
					agentCtrl.neighborhoodsArray = res.data;
				})

			// factory not necessary, refactor later
			AgentProfileFactory.getListedHouses(user.add_info)
				.then((res) => agentCtrl.houses = res);

			// factory not necessary, refactor later
			AgentProfileFactory.getHouseRequests()
				.then((res) => {
					agentCtrl.requests = res});

			$http.get(`${apiUrl}/conversations/?convo_agent=${agentCtrl.user.username}`)
				.then((res) => agentCtrl.convos = res.data)

			$http.get(`${apiUrl}/house_sales/?agent_id=${user.add_info.id}`)
				.then((res) => {
					agentCtrl.sales = res.data;
					console.log("SALES:", agentCtrl.sales);
					agentCtrl.metrics.number_of_sales = agentCtrl.sales.length;
					for (i = 0; i <= agentCtrl.sales.length; i++) {
						agentCtrl.metrics.total_sales += agentCtrl.sales[i].price
					}
				})

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

			}

			agentCtrl.submitNewHouse = function (file) {
				let input = document.querySelector('[type="file"]');
				let image_file = input.files[0];
				let randomInteger = Math.random() * 1e17;
				let getFileExtension = image_file.type.split('/').slice(-1)[0];
				let randomPath = `${randomInteger}.${getFileExtension}`;

				firebase.storage().ref().child(randomPath).put(image_file)
					.then((res) => {
						console.log("res: ", res.downloadURL);
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
								"neighborhood": agentCtrl.listedNeighborhood.id,
								"agent": user.add_info.id
							}
						})
					})
					.then((res) => agentCtrl.houses.push(res.data))
			}

			agentCtrl.showRequest = function (request_id) {
				$location.path(`/requestDetail/${request_id}`);
			}

			agentCtrl.showHouse = function (house_id) {
				$location.path(`/houseDetail/${house_id}`);
			}

			agentCtrl.showConvo = function (convo_id) {
				$location.path(`/convoDetail/${convo_id}`)
			}
	}])
