angular.module("nh")
	.factory("AgentProfileFactory", [
		"$http",
		"apiUrl",
		($http, apiUrl) => {

			return {
				getListedHouses (user) {
					let getRequests = $http.get(`${apiUrl}/houses/?agent_id=${user.pk}`)
					return getRequests.then((res) => res.data)
				}
			}
		}])
