angular.module('nh').factory('LandingFactory', [
    '$cookies',
    '$location',
    ($cookies, $location) => {
    	let userCredentials = null;

    	return {
    		setCredentials (creds) {
    			if (creds) {
    				userCredentials = window.btoa(`${creds.username}:${creds.password}`);
    				$cookies.put("creds", userCredentials)
    			}
    		},

    		getCredentials () {
    			userCredentials = $cookies.get("creds")
                return window.atob(userCredentials)
    		},

    		logout () {
    			userCredentials = null;
        		$cookies.remove('creds');
        		$location.path("/");
        	}

    	}
    }
])
