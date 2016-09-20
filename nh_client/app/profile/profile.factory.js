angular.module("nh")
	.factory("ProfileFactory", [
		"$http",
		"apiUrl",
		($http, apiUrl) => {
			let request_array;

			return {
				getHouseRequests (user) {
					let getRequests = $http.get(`${apiUrl}/house_requests/?buyer_id=${user.pk}`)
					return getRequests.then((res) => res.data)
				}
			}
		}])
