angular.module('app.loginCtrl', [])

.controller('loginCtrl', function($scope,$http,$location,userData) {
	$scope.login = function(user){
		userData.setMe(user.username);
		$http
			.post("http://apis.asfwan.com/users/login",{
				username:user.username,
				password:user.password
			})
			.then(function(r){
				$location.path("/main/iou");
				userData.setMySessionId(r.data.id);
				console.log(r.data);
			},function(r){
				console.log("ERROR");
				console.log(r.data);
			});
	}
})