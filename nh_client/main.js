angular.module("nh", ["ngRoute", "ngCookies"])
    .constant("apiUrl", "http://localhost:8000")
    .run((LandingFactory, $rootScope, $location) => {
        LandingFactory.getCredentials();
        $rootScope.location = $location;
    })

firebase.initializeApp({
    apiKey: "AIzaSyANGk9Up_VDGDqnr5xplWcBQSYzkSB7be8",
    authDomain: "neighborhood-f9998.firebaseapp.com",
    databaseURL: "https://neighborhood-f9998.firebaseio.com",
    storageBucket: "neighborhood-f9998.appspot.com",
    messagingSenderId: "248423265813"
})

let showNav = false
