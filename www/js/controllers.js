angular.module('app.controllers', [])
  
.controller('iOUCtrl', function($scope,$http,userData,$location) {
	
	$scope.refresh = function(){
		$http
			.get("http://apis.asfwan.com/money")
			.then(function(r){
				$scope.money = r.data
			});
	}
	$scope.refresh();

	$scope.cardClick = function(money){
		userData.setOwing(money.owing);
		userData.setAmount(money.amount);
		userData.setId(money.id);
	}

	$scope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams) {
			if ($location.path() == "/main/iou") {
				$scope.refresh();
		    }
		});
})
   
.controller('friendsCtrl', function($scope,$http) {
	$http
		.get("http://apis.asfwan.com/users")
		.then(function(r){
			$scope.users = r.data
		});
})
   
.controller('settingsCtrl', function($scope) {

})
      
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
})

.controller('loginCtrl', function($scope) {

})
 