angular.module("nh")
	.factory("AgentProfileFactory", [
		"$http",
		"apiUrl",
		($http, apiUrl) => {
			let request;

			return {
				getListedHouses (user) {
					let getHouses = $http.get(`${apiUrl}/houses/?agent_id=${user.id}`)
					return getHouses.then((res) => res.data)
				},

				getHouseRequests () {
					let getRequests = $http.get(`${apiUrl}/house_requests/`)
					return getRequests.then((res) => res.data)
				},
			}
		}])
