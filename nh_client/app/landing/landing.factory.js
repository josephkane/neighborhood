angular.module('nh').factory('LandingFactory', [
    '$cookies',
    '$location',
    ($cookies, $location) => {
    	let userCredentials = null;
        let currentUser;
        let currentUserInfo;


    	return {
    		setCredentials (creds) {
    			if (creds) {
    				userCredentials = window.btoa(`${creds.username}:${creds.password}`);
    				$cookies.put("creds", userCredentials)
    			}
    		},

    		getCredentials () {
    			userCredentials = $cookies.get("creds")
                console.log("creds: ", userCredentials);
                if (userCredentials) {
                    return window.atob(userCredentials)
                }
    		},

    		logout () {
    			userCredentials = null;
        		$cookies.remove('creds');
        		$location.path("/");
        	},

            setUser (user, add_info) {
                currentUser = user;
                currentUserInfo = add_info;
            },

            getUser () {
                return {"user": currentUser, "add_info": currentUserInfo}
            },
    	}
    }
])
