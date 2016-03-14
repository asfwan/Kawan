angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.iOU', {
    url: '/iou',
    views: {
      'tab1': {
        templateUrl: 'templates/iOU.html',
        controller: 'iOUCtrl'
      }
    }
  })

  .state('tabsController.friends', {
    url: '/friends',
    views: {
      'tab2': {
        templateUrl: 'templates/friends.html',
        controller: 'friendsCtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/main',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.user', {
    url: '/user/:name',
    views: {
      'tab1': {
        templateUrl: 'templates/user.html',
        controller: 'userCtrl'
      }
    }
  })

  .state('tabsController.addFriend', {
    url: '/addFriend',
    views: {
      'tab2': {
        templateUrl: 'templates/addFriend.html',
        controller: 'addFriendCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')// /main/iou

  

});