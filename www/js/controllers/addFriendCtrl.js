angular.module('app.addFriendCtrl', [])

.controller('addFriendCtrl', function($scope,$http,$ionicHistory) {
	$scope.addFriend = function(user){
		$http.
			post("http://apis.asfwan.com/users",{
				username:user.username,
				email:user.email
			})
			.then(function(r){
				console.log(r.data);
			});
	}

	$scope.cancelAdd = function(){
		$ionicHistory.goBack();
	}
})