angular.module('app.userCtrl', [])

.controller('userCtrl', function($scope,userData,$ionicHistory,$http) {
	$scope.user = userData;

	$scope.amount = $scope.user.amount;

	$scope.applyAndBack = function(d){
		$http
			.put("http://apis.asfwan.com/money",{
				id:$scope.user.id,
				amount:d
			})
			.then(function(){
				$ionicHistory.goBack();
			});
	}

	$scope.deleteAndBack = function(d){
		$http
			.delete("http://apis.asfwan.com/money?"+"{\"id\":\""+$scope.user.id+"\"}")
			.then(function(){
				$ionicHistory.goBack();
			},function(r){
				console.log("ERROR");
				console.log(r.data);
			});
	}
})