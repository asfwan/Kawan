angular.module('app.controllers', [])
  
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
   
.controller('friendsCtrl', function($scope,$http,$ionicActionSheet,StringFactory,$ionicPopup,userData,$location) {
	$http
		.get("http://apis.asfwan.com/users")
		.then(function(r){
			$scope.users = r.data
		});

	$scope.showActionSheet = function(name){
		var person = StringFactory.capitalizeFirstLetter(name);
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
		 buttons: [
		   { text: person+' owes me' },
		   { text: 'I owe '+person }
		 ],
		 titleText: 'Choose which context',
		 cancelText: 'Cancel',
		 cancel: function() {
		    // add cancel code..
		    },
		 buttonClicked: function(index) {
		 	var title = "",owing="",owedfrom="";
		 	if(index==0){
		 		title = "How much does "+person+" owe you?";
		 		owing = name;
		 		owedfrom = userData.me;
		 	}else{
		 		title = "How much do you owe "+person+"?";
		 		owedfrom = name;
		 		owing = userData.me;
		 	}

		 	$scope.data = {};

		 	$ionicPopup
		 		.show({
				    template: '<input type="number" ng-model="data.amount">',
				    title: title,
				    subTitle: 'Please input amount of money owed',
				    scope: $scope,
				    buttons: [
				      { text: 'Cancel' },
				      {
				        text: '<b>Submit</b>',
				        type: 'button-positive',
				        onTap: function(e) {
				          if (!$scope.data.amount) {
				            //don't allow the user to close unless he enters wifi password
				            e.preventDefault();
				          } else {
				          	//alert($scope.data.amount);
				            return $scope.data.amount;
				          }
				        }
				      }
				    ]
				})
				.then(function(res){
					$http
						.post("http://apis.asfwan.com/money",{
							amount:res,
							owing:owing,
							owedfrom:owedfrom
						})
						.then(function(r){
							$location.path("/main/iou");
						},function(r){
							console.log("ERROR");
							console.log(r.data);
						});
				});

		 	return true;
		 }
	   });
	}
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
			},function(r){
				console.log("ERROR");
				console.log(r.data);
			});
	}
})
 