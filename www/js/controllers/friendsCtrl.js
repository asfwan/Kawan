angular.module('app.friendsCtrl', [])

.controller('friendsCtrl', function($scope,$http,$ionicActionSheet,StringFactory,$ionicPopup,userData,$location,$ionicModal) {
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