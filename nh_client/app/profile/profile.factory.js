angular.module("nh")
	.factory("ProfileFactory", [
		"$http",
		"apiUrl",
		($http, apiUrl) => {
			let request_array;
			let house_for_sale;

			return {
				getHouseRequests (user) {
					let getRequests = $http.get(`${apiUrl}/house_requests/?buyer_id=${user.id}`)
					return getRequests.then((res) => res.data)
				},

				getHousesForSale () {
					let getHouses = $http.get(`${apiUrl}/houses/?selling=True`)
					return getHouses.then((res) => res.data)
				},

				setHouse (house) {
					house_for_sale = house
				},

				getHouse () {
					return house_for_sale
				}
			}
		}])
