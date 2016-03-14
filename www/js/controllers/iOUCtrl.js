angular.module('app.iOUCtrl', [])

.controller('iOUCtrl', function($scope,$http,userData,$location,StringFactory,userData) {
	
	$scope.refresh = function(){
		var me = userData.me;
		$http
			.get("http://apis.asfwan.com/money?{\"$or\":[{\"owing\":\""+me+"\"},{\"owedfrom\":\""+me+"\"}]}")
			.then(function(r){
				$scope.money = r.data;
				for(i=0;i<$scope.money.length;i++){
					//$scope.owetext.push(
					$scope.money[i].owetext =
						($scope.money[i].owing==userData.me)?
						"You owe "+StringFactory.capitalizeFirstLetter($scope.money[i].owedfrom)+":":
						StringFactory.capitalizeFirstLetter($scope.money[i].owing)+" owes you:"
					//);
				}
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