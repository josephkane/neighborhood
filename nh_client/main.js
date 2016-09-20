angular.module("nh", ["ngRoute", "ngCookies"])
    .constant("apiUrl", "http://localhost:8000")
    // .constant("requiresAuth", ($location, LandingFactory) => new Promise((resolve, reject) => {
    //     if (LandingFactory.getCredentials()) {
    //         console.log("User is authenticated, resolve route promise");
    //         resolve();
    //     } else {
    //         console.log("User is not authenticated, reject route promise");
    //         reject();
    //         $location.path("/");
    //     }
    // })
    // .constant("getLoggedInUser", (LandingFactory, $http) => new Promise((resolve, reject) => {
    //     $http.get(`${apiUrl}/users/`)
    //         .then(res => {
    //             allUsers = res.data
    //             currentUsername = AuthFactory.getUsername();
    //             for (var i = 0; i < allUsers.length; i++) {
    //                 if (currentUsername === allUsers[i].username) {
    //                     resolve(allUsers[i]);
    //                     console.log("MATCH:", allUsers[i]);
    //                     // LandingFactory.setUserObject(allUsers[i]);
    //                 }
    //             }
    //             reject(null);
    //         })
    //     })))
    .run(LandingFactory => {
        LandingFactory.getCredentials();
    })

firebase.initializeApp({
    apiKey: "AIzaSyANGk9Up_VDGDqnr5xplWcBQSYzkSB7be8",
    authDomain: "neighborhood-f9998.firebaseapp.com",
    databaseURL: "https://neighborhood-f9998.firebaseio.com",
    storageBucket: "neighborhood-f9998.appspot.com",
    messagingSenderId: "248423265813"
})
