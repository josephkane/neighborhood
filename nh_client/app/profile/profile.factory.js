angular.module("nh")
	.factory("ProfileFactory", [
		"$http",
		"apiUrl",
		"$timeout",
		($http, apiUrl, $timeout) => {
			let request_array;

			return {
				getHouseRequests (user) {
					console.log("user?", user);
					let getRequests = $http.get(`${apiUrl}/house_requests/?buyer_id=${user.pk}`)
					console.log("getRequests?", getRequests);
					return getRequests.then((res) => res.data)
				}
			}
		}])
