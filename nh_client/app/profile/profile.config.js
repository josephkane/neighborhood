// let requiresAuth = ($location, LandingFactory) => new Promise((resolve, reject) => {
// 	if (LandingFactory.getCredentials()) {
//     	console.log("User is authenticated, resolve route promise");
//     	resolve();
//     } else {
//     	console.log("User is not authenticated, reject route promise");
//     	reject();
//     	$location.path("/");
// 	}
// });

// let getLoggedInUser = (LandingFactory, $http, apiUrl, $timeout) => new Promise((resolve, reject) => {
//     let currentUser;
//     let add_info;
//     $http.get(`${apiUrl}/users/`)
//         .then(res => {
//             allUsers = res.data
//             currentUserCredentials = LandingFactory.getCredentials()
//             currentUsername = currentUserCredentials.split(":")[0]
//             console.log("CURRENT USER:", currentUsername);
//             for (var i = 0; i < allUsers.length; i++) {
//                 if (currentUsername === allUsers[i].username) {
//                 	$http.get(`${apiUrl}/users/${allUsers[i].id}`)
//                 		.then((res) => {
//                 			console.log("inside user", res.data);
//                 			currentUser = res.data;
//                 		})
//                 	$http.get(`${apiUrl}/buyers/?user_id=${allUsers[i].id}`)
//                 		.then((res) => {
//                 			console.log("inside info", res.data[0]);
//                 			add_info = res.data[0]
//                 		})
//                 		.then(() => {
//                 			console.log("current user:", currentUser);
//                 			console.log("current info:", add_info);
//                    			LandingFactory.setUser(currentUser, add_info);
//                 		})
//                    	console.log("done");
//                     resolve();
//                 }
//             }
//             reject(null);
//         })
// });


angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/profile", {
				controller: "ProfileCtrl",
				controllerAs: "profCtrl",
				templateUrl: "app/profile/profile.html",
				// resolve: { requiresAuth, getLoggedInUser }
			})
	})
