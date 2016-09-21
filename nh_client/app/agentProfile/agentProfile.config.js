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

let getLoggedInAgent = (LandingFactory, $http, apiUrl, $timeout) => new Promise((resolve, reject) => {
    let currentUser;
    let add_info;
    $http.get(`${apiUrl}/agents/`)
        .then(res => {
            allUsers = res.data
            currentUserCredentials = LandingFactory.getCredentials();
            currentUsername = currentUserCredentials.split(":")[0];
            console.log("res:", res);
            console.log("CURRENT USER:", currentUsername);
            for (var i = 0; i < allUsers.length; i++) {
                if (currentUsername === allUsers[i].user.username) {
                	LandingFactory.setUser(allUsers[i].user, allUsers[i])
                	console.log("done");
                resolve();
                }
            }
            reject(null);
        })
});



angular.module("nh")
	.config(($routeProvider) => {
		$routeProvider
			.when("/agentProfile", {
				controller: "AgentCtrl",
				controllerAs: "agentCtrl",
				templateUrl: "app/agentProfile/agentProfile.html",
				resolve: { requiresAuth, getLoggedInAgent }
			})
	})
