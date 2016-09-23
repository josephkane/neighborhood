angular.module("nh")
	.controller("ConvoDetailCtrl", [
		"$http",
		"$location",
		"$routeParams",
		"apiUrl",
		"LandingFactory",
		function ($http, $location, $routeParams, apiUrl, LandingFactory) {
			const convoCtrl = this;

			let agent_username;
			let buyer_username;
			let recipient;

			convoCtrl.currentUser = LandingFactory.getUser()
			let currentUserName = convoCtrl.currentUser.user.username

			$http.get(`${apiUrl}/conversations/${$routeParams.convoId}/`)
				.then((res) => {
					convoCtrl.convo = res.data;
					agent_username = convoCtrl.convo.convo_agent.user.username;
					buyer_username = convoCtrl.convo.convo_buyer.user.username;
					recipient = (currentUserName === agent_username ? buyer_username : agent_username);
					console.log("currentUserName: ", currentUserName);
				});


			convoCtrl.replyMessage = function () {
				$http({
					url: `${apiUrl}/create_new_message/`,
					method: "POST",
					headers: {"Content-type": "application/x-www-form-encoded"},
					data: {
						"author": currentUserName,
						"recipient": recipient,
						"text": convoCtrl.reply,
						"convo": convoCtrl.convo.id,
					}
				})
				.then((res) => {
					console.log("res:", res);
					convoCtrl.convo.message.push(res.data[0].fields);
				})
			}
		}
	])
