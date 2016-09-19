angular.module("nh")
	.factory("ProfileFactory", [
		"$http",
		"apiUrl",
		"$timeout",
		($http, apiUrl, $timeout) => {
			let request_array;

			return {
				getHouseRequests (user) {
					let getRequests = $http.get(`${apiUrl}/house_requests/?buyer_id=${user.pk}`)
					return getRequests.then((res) => res.data)
				}
			}
		}])
