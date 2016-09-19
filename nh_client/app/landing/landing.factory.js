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
    			return $cookies.get("creds")
    		},

    		logout () {
    			userCredentials = null;
        		$cookies.remove('creds');
        		$location.path("/");
        	}

    	}
    }
])
